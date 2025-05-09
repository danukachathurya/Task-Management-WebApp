import React from "react";
import { LayoutDashboard, CheckSquare, Plus, LogOut } from "lucide-react";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-center py-6 border-b">
            Task Central
          </h2>
          <nav className="p-4 space-y-2">
            <a
              href="/dashboard"
              className="flex items-center space-x-2 text-gray-700 hover:text-black px-3 py-2 rounded-lg transition-colors hover:bg-gray-100"
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </a>
            <a
              href="/tasks"
              className="flex items-center space-x-2 bg-gray-900 text-white px-3 py-2 rounded-lg"
            >
              <CheckSquare size={18} />
              <span>Tasks</span>
            </a>
            <a
              href="/tasks/new"
              className="flex items-center space-x-2 text-gray-700 hover:text-black px-3 py-2 rounded-lg transition-colors hover:bg-gray-100"
            >
              <Plus size={18} />
              <span>Add Task</span>
            </a>
          </nav>
        </div>

        {/* Footer User Info */}
        <div className="border-t px-4 py-4 flex items-center space-x-3">
          <div className="w-10 h-10 bg-red-100 text-red-700 rounded-full flex items-center justify-center font-bold">
            DU
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Demo User</p>
            <a
              href="/logout"
              className="text-xs text-gray-500 hover:text-gray-700 flex items-center space-x-1"
            >
              <LogOut size={14} />
              <span>Logout</span>
            </a>
          </div>
        </div>
      </aside>
      {/* Content Area */}
      <main className="flex-1 p-6">{children}</main>{" "}
      {/* This part renders children */}
    </div>
  );
}
