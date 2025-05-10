import React from "react";
import { LayoutDashboard, CheckSquare, Plus, LogOut } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom"; // Added useNavigate
import { useDispatch, useSelector } from "react-redux"; // Added useSelector
import { signoutSuccess } from "../redux/user/userSlice";

export default function DashboardLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate(); // Needed for redirect
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser); // Get user from Redux

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/tasks", label: "Tasks", icon: CheckSquare },
    { href: "/add-task", label: "Add Task", icon: Plus },
  ];

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/auth/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
        navigate("/sign-in");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white shadow-md flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-center py-6 border-b">
            Task Central
          </h2>
          <nav className="p-4 space-y-2">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const isActive = location.pathname === href;
              return (
                <a
                  key={href}
                  href={href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-700 hover:text-black hover:bg-gray-100"
                  }`}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </a>
              );
            })}
          </nav>
        </div>

        {/* Footer User Info */}
        <div className="border-t px-4 py-4 flex items-center space-x-3">
          <div className="w-10 h-10 bg-red-100 text-red-700 rounded-full flex items-center justify-center font-bold">
            {currentUser?.name?.[0]?.toUpperCase() || "U"}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">
              {currentUser?.name || currentUser?.username || "Guest"}
            </p>
            <button
              onClick={handleSignout}
              className="text-xs text-gray-500 hover:text-gray-700 flex items-center space-x-1"
            >
              <LogOut size={14} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
