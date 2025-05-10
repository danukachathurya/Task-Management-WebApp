import React, { useState } from "react";
import { useSelector } from "react-redux";
import DashboardLayout from "../components/DashboardLayout";

export default function AddTask() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    status: "Pending",
    deadline: "",
    userId: currentUser._id,
  });

  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const res = await fetch("/api/task/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitError(data.message || "Failed to add task.");
        return;
      }

      setSubmitSuccess(true);
      setFormData({
        title: "",
        description: "",
        assignedTo: "",
        status: "Pending",
        deadline: "",
        userId: currentUser._id,
      });
    } catch (error) {
      setSubmitError("Something went wrong. Please try again.");
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto bg-white p-8 mt-10 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-6">Add New Task</h2>

        {submitSuccess && (
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4">
            Task added successfully!
          </div>
        )}
        {submitError && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
            {submitError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Task Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
              required
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Detailed task description"
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
                onChange={handleChange}
                placeholder="Enter name"
                required
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
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
                onChange={handleChange}
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
              Create Task
            </button>
            <button
              type="button"
              className="border border-gray-300 px-5 py-2 rounded hover:bg-gray-100"
              onClick={() =>
                setFormData({
                  title: "",
                  description: "",
                  assignedTo: "",
                  status: "Pending",
                  deadline: "",
                })
              }
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
