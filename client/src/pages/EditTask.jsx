import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    status: "Pending",
    deadline: "",
  });

  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch the task data
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(`/api/task/${id}`);
        const data = await res.json();

        if (res.ok) {
          setFormData({
            title: data.task.title || "",
            description: data.task.description || "",
            assignedTo: data.task.assignedTo || "",
            status: data.task.status || "Pending",
            deadline: data.task.deadline
              ? data.task.deadline.split("T")[0]
              : "",
          });
        } else {
          setSubmitError("Failed to fetch task data.");
        }
      } catch (err) {
        setSubmitError("An error occurred while fetching the task.");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  // Handle form submission
  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/task/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitSuccess(true);
        setTimeout(() => navigate("/tasks"), 1000);
      } else {
        setSubmitError(data.error || "Failed to update task.");
      }
    } catch (error) {
      console.error("Error editing task:", error);
      setSubmitError("Something went wrong while updating the task.");
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center mt-10">Loading task...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto bg-white p-8 mt-10 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-6">Edit Task</h2>

        {submitSuccess && (
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4">
            Task updated successfully!
          </div>
        )}
        {submitError && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
            {submitError}
          </div>
        )}

        <form onSubmit={handleEdit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Task Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              required
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              required
              className="w-full border rounded px-4 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                Assigned To <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="assignedTo"
                value={formData.assignedTo}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    assignedTo: e.target.value,
                  }))
                }
                required
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    status: e.target.value,
                  }))
                }
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Deadline <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    deadline: e.target.value,
                  }))
                }
                required
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="bg-black text-white px-5 py-2 rounded hover:bg-gray-800"
            >
              Update Task
            </button>
            <button
              type="button"
              className="border border-gray-300 px-5 py-2 rounded hover:bg-gray-100"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
