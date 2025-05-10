import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DashboardLayout from "../components/DashboardLayout";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Registering chart components
ChartJS.register(BarElement, CategoryScale, LinearScale);

const Dashboard = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState("chart");
  const [totalTasks, setTotalTasks] = useState(0);
  const [statusCounts, setStatusCounts] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
  });

  const completionPercentage = Math.round(
    ((statusCounts?.completed || 0) / (statusCounts?.total || 1)) * 100
  );

useEffect(() => {
  if (!currentUser || !currentUser._id) {
    console.warn("No current user found in Redux.");
    setLoading(false);
    return;
  }

  const fetchTasks = async () => {
    try {
      const res = await fetch(`/api/task/all/`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to fetch tasks");

      if (Array.isArray(data.tasks)) {
        setTasks(data.tasks);
        setTotalTasks(data.totalTasks || 0);
        setStatusCounts(
          data.statusCounts || {
            total: 0,
            pending: 0,
            inProgress: 0,
            completed: 0,
          }
        );
      } else {
        throw new Error("Invalid data format from server");
      }
    } catch (err) {
      console.error("Error fetching tasks:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchTasks();
}, [currentUser]);

  

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;
  if (!currentUser) return <div className="p-6">User not logged in</div>;

  const chartData = {
    labels: ["Pending", "In Progress", "Completed"],
    datasets: [
      {
        label: "Tasks",
        backgroundColor: ["#f59e0b", "#3b82f6", "#10b981"],
        data: [
          statusCounts.pending,
          statusCounts.inProgress,
          statusCounts.done,
        ],
      },
    ],
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold">
          Welcome, {currentUser?.name || currentUser?.username || "Guest"}
        </h1>
        <p className="text-gray-600">Here's an overview of your tasks</p>

        {/* Task cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white border p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Total Tasks</h2>
            <p className="text-3xl">{totalTasks}</p>
            <p className="text-gray-500 text-sm">All assigned tasks</p>
          </div>
          <div className="bg-white border p-4 rounded shadow text-yellow-600">
            <h2 className="text-lg font-semibold">Pending</h2>
            <p className="text-3xl">{statusCounts.pending}</p>
            <p className="text-gray-500 text-sm">Not started yet</p>
          </div>
          <div className="bg-white border p-4 rounded shadow text-blue-600">
            <h2 className="text-lg font-semibold">In Progress</h2>
            <p className="text-3xl">{statusCounts.inProgress}</p>
            <p className="text-gray-500 text-sm">Currently being worked on</p>
          </div>
          <div className="bg-white border p-4 rounded shadow text-green-600">
            <h2 className="text-lg font-semibold">Completed</h2>
            <p className="text-3xl">{statusCounts.done}</p>
            <p className="text-gray-500 text-sm">Successfully finished</p>
          </div>
        </div>

        {/* Task Completion Progress */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Task Completion</h2>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-black h-3 rounded-full"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          <p className="text-right text-sm mt-1">{completionPercentage}%</p>
        </div>

        {/* Chart & Summary Tabs */}
        <div>
          <div className="flex border rounded overflow-hidden mb-4">
            <button
              className={`flex-1 py-2 text-center ${
                tab === "chart" ? "bg-white font-semibold" : "bg-gray-100"
              }`}
              onClick={() => setTab("chart")}
            >
              Chart View
            </button>
            <button
              className={`flex-1 py-2 text-center ${
                tab === "summary" ? "bg-white font-semibold" : "bg-gray-100"
              }`}
              onClick={() => setTab("summary")}
            >
              Summary
            </button>
          </div>

          <div className="bg-white p-4 rounded shadow">
            {tab === "chart" ? (
              <>
                <h2 className="text-xl font-semibold mb-2">Task Distribution</h2>
                <Bar data={chartData} />
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-2">Task Summary</h2>
                {tasks.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {tasks.map((task) => (
                      <li key={task._id}>
                        {task.title} —{" "}
                        <span className="text-gray-500">{task.status}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No tasks found</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
