import React, { useState, useEffect } from "react";
import { MoreHorizontal, Trash2, Filter, Edit, Trash } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import DashboardLayout from "../components/DashboardLayout";
import { useNavigate } from "react-router-dom";

const statusColors = {
  Done: "bg-green-500",
  Pending: "bg-yellow-400",
  "In Progress": "bg-blue-500",
};

export default function Task() {
  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [actionMenuOpen, setActionMenuOpen] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/task/all");
      const data = await res.json();
      setTasks(data.tasks || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const res = await fetch(`/api/task/delete/${taskId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSelect = (id) => {
    setSelectedTasks((prev) =>
      prev.includes(id) ? prev.filter((taskId) => taskId !== id) : [...prev, id]
    );
  };

  const handleAddTask = () => {
    navigate("/add-task");
  };

  const handleEdit = (taskId) => {
    navigate(`/edit-task/${taskId}`);
  };

  const filteredTasks =
    filter === "All" ? tasks : tasks.filter((task) => task.status === filter);

    const exportToPDF = () => {
      const doc = new jsPDF();
    
      doc.setFontSize(18);
      doc.text("Tasks Report", 14, 22);
      doc.setFontSize(11);
      doc.setTextColor(100);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
    
      const tableColumn = ["Task Title", "Assigned To", "Deadline", "Status"];
      const tableRows = [];
    
      filteredTasks.forEach((task) => {
        const rowData = [
          task.title,
          task.assignedTo,
          new Date(task.deadline).toLocaleDateString("en-US"),
          task.status,
        ];
        tableRows.push(rowData);
      });
    
      autoTable(doc, {
        startY: 36,
        head: [tableColumn],
        body: tableRows,
        styles: { halign: "left" },
        headStyles: { fillColor: [0, 123, 189] },
        alternateRowStyles: { fillColor: [240, 240, 240] },
      });
    
      doc.save("tasks-report.pdf");
    };

  return (
    <DashboardLayout>
      <div className="p-6 bg-white rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Task Management</h2>
          <div className="flex space-x-3">
            <button
              onClick={handleAddTask}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Add New Task
            </button>
            <button
              onClick={exportToPDF}
              className="border px-4 py-2 rounded hover:bg-gray-100"
            >
              Export PDF
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="relative w-full max-w-sm">
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full border rounded-lg py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Filter className="absolute right-3 top-2.5 w-4 h-4 text-gray-500" />
          </div>

          <div className="ml-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm"
            >
              <option>All</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </div>
        </div>

        {selectedTasks.length > 0 && (
          <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded mb-2 flex items-center justify-between">
            <p>{selectedTasks.length} task(s) selected</p>
            <button
              onClick={() =>
                selectedTasks.forEach((taskId) => handleDelete(taskId))
              }
              className="flex items-center text-red-600 hover:text-red-800 text-sm"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Delete Selected
            </button>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border rounded-lg">
            <thead>
              <tr className="text-left bg-gray-100">
                <th className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedTasks.length === filteredTasks.length}
                    onChange={(e) =>
                      setSelectedTasks(
                        e.target.checked ? filteredTasks.map((t) => t._id) : []
                      )
                    }
                  />
                </th>
                <th className="p-3">Title</th>
                <th className="p-3">Assigned To</th>
                <th className="p-3">Deadline</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedTasks.includes(task._id)}
                      onChange={() => handleSelect(task._id)}
                    />
                  </td>
                  <td className="p-3 font-medium text-gray-900">
                    {task.title}
                  </td>
                  <td className="p-3">{task.assignedTo}</td>
                  <td className="p-3">
                    {new Date(task.deadline).toLocaleDateString("en-CA")}
                  </td>
                  <td className="p-3">
                    <span
                      className={`text-white text-xs px-2 py-1 rounded-full ${
                        statusColors[task.status]
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="p-3 text-right relative">
                    <button
                      onClick={() =>
                        setActionMenuOpen(
                          actionMenuOpen === task._id ? null : task._id
                        )
                      }
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <MoreHorizontal size={18} />
                    </button>
                    {actionMenuOpen === task._id && (
                      <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow-md z-10">
                        <button
                          onClick={() => handleEdit(task._id)}
                          className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Edit className="w-4 h-4 mr-2" /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(task._id)}
                          className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <Trash className="w-4 h-4 mr-2" /> Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
