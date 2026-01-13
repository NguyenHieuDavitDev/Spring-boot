"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Icon from "./Icon";
import { logout } from "../services/api";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    // Extract email from token (simple decode)
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserEmail(payload.sub || "");
    } catch (e) {
      console.error("Error parsing token", e);
    }
  }, [router]);

  useEffect(() => {
    // Close mobile menu on route change
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      console.error("Logout error", e);
    } finally {
      localStorage.removeItem("token");
      router.push("/login");
    }
  };

  const isActive = (path: string) => pathname === path;

  const menuItems = [
    { href: "/admin", label: "Dashboard", icon: "chartBar" },
    { href: "/admin/users", label: "Quản lý User", icon: "users" },
    { href: "/admin/roles", label: "Quản lý Role", icon: "shield" },
  ];

  return (
    <div className="fixed inset-0 flex flex-col bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 overflow-hidden">
      {/* Top Navbar - Fixed */}
      <nav className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 text-white shadow-xl z-50 flex-shrink-0 h-16">
        <div className="flex items-center justify-between px-6 h-full">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-white/20 rounded-lg transition-all duration-200"
            >
              <Icon name="menu" className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3">
              <Icon name="dashboard" className="w-6 h-6 text-white" />
              <div>
                <h1 className="text-xl font-bold">Admin Dashboard</h1>
                <p className="text-xs text-indigo-200">Quản trị hệ thống</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Icon name="user" className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium truncate max-w-[200px]">{userEmail}</span>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg flex items-center gap-2 transition-all duration-200 backdrop-blur-sm font-medium"
            >
              <Icon name="signOut" className="w-4 h-4" />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Fixed */}
        <aside
          className={`bg-gradient-to-b from-gray-800 to-gray-900 text-white transition-all duration-300 ease-in-out flex-shrink-0 shadow-2xl ${
            sidebarOpen ? "w-64" : "w-20"
          } overflow-y-auto`}
        >
          <div className="p-4 h-full">
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group ${
                    isActive(item.href)
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg"
                      : "hover:bg-gray-700/50"
                  }`}
                >
                  <div className={`flex-shrink-0 ${isActive(item.href) ? "text-white" : "text-gray-300 group-hover:text-white"}`}>
                    <Icon name={item.icon as any} className="w-5 h-5" />
                  </div>
                  {sidebarOpen && (
                    <span className={`font-medium transition-opacity duration-200 whitespace-nowrap ${isActive(item.href) ? "text-white" : "text-gray-300 group-hover:text-white"}`}>
                      {item.label}
                    </span>
                  )}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content - Fixed Full Screen */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-6 h-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
