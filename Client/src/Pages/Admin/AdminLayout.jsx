import React from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const navItems = [
    { path: "/admin/experiences", label: "Experiences" },
    { path: "/admin/projects", label: "Projects" },
    { path: "/admin/education", label: "Education" },
    { path: "/admin/resume", label: "Resume" },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 flex">
      {/* Sidebar */}
      <div className="w-64 bg-zinc-900 border-r border-zinc-800 p-4">
        <h1 className="text-xl font-bold text-lime-400 mb-8">Admin Panel</h1>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-4 py-2 rounded transition ${
                location.pathname === item.path
                  ? "bg-lime-400/10 text-lime-400"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="w-full mt-8 px-4 py-2 border border-zinc-700 text-zinc-400 rounded hover:text-red-400 hover:border-red-400 transition"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;