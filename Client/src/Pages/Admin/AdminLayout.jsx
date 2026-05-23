import React from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Briefcase,
  FolderGit2,
  GraduationCap,
  FileText,
  LogOut,
  Settings,
  LayoutDashboard,
  User,
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import api from "../../utils/api";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const logoutMutation = useMutation({
    mutationFn: () => api.post("/api/auth/logout"),
    onSuccess: () => {
      navigate("/admin/login");
    },
    onError: () => {
      navigate("/admin/login");
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const navItems = [
    { path: "/admin/experiences", label: "Experiences", icon: Briefcase },
    { path: "/admin/projects", label: "Projects", icon: FolderGit2 },
    { path: "/admin/education", label: "Education", icon: GraduationCap },
    { path: "/admin/resume", label: "Resume", icon: FileText },
    { path: "/admin/profile-image", label: "Profile Image", icon: User },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-zinc-900/50 border-r border-zinc-800 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-lime-400/10 border border-lime-400/20 flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-lime-400" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Admin Panel</h1>
              <p className="text-xs text-zinc-500">Portfolio Management</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-lime-400 text-zinc-950 font-semibold"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800 space-y-3">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all duration-200"
          >
            <Settings className="w-5 h-5" />
            View Website
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <header className="h-16 bg-zinc-900/30 border-b border-zinc-800 flex items-center justify-between px-8">
          <div className="flex items-center gap-2">
            <span className="text-zinc-500 text-sm">Dashboard</span>
            <span className="text-zinc-600">/</span>
            <span className="text-white text-sm capitalize">
              {location.pathname.split("/").pop()}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
            <span className="text-zinc-500 text-sm">Connected</span>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
