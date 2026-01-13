"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "../components/AdminLayout";
import { userApi, roleApi } from "../services/api";
import Icon from "../components/Icon";

export default function AdminPage() {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRoles: 0,
    activeUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    loadStats();
  }, [router]);

  const loadStats = async () => {
    try {
      const [users, roles] = await Promise.all([
        userApi.getAll(),
        roleApi.getAll(),
      ]);
      setStats({
        totalUsers: users.length,
        totalRoles: roles.length,
        activeUsers: users.filter((u: any) => u.enabled).length,
      });
    } catch (e: any) {
      console.error("Error loading stats", e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-full">
          <Icon name="spinner" className="w-12 h-12 animate-spin text-indigo-600" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in h-full">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
              <Icon name="chartBar" className="w-8 h-8 text-indigo-600" />
              <span>Dashboard</span>
            </h1>
            <p className="text-gray-600 mt-1">Tổng quan hệ thống</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 animate-slide-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1 flex items-center gap-2">
                  <Icon name="users" className="w-4 h-4" />
                  <span>Tổng số User</span>
                </p>
                <p className="text-4xl font-bold text-gray-800 mt-2">{stats.totalUsers}</p>
                <p className="text-xs text-gray-400 mt-2">Tất cả người dùng</p>
              </div>
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-4 rounded-2xl shadow-lg">
                <Icon name="users" className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 animate-slide-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1 flex items-center gap-2">
                  <Icon name="checkCircle" className="w-4 h-4" />
                  <span>User đang hoạt động</span>
                </p>
                <p className="text-4xl font-bold text-green-600 mt-2">{stats.activeUsers}</p>
                <p className="text-xs text-gray-400 mt-2">Đã kích hoạt</p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-2xl shadow-lg">
                <Icon name="checkCircle" className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 animate-slide-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1 flex items-center gap-2">
                  <Icon name="shield" className="w-4 h-4" />
                  <span>Tổng số Role</span>
                </p>
                <p className="text-4xl font-bold text-purple-600 mt-2">{stats.totalRoles}</p>
                <p className="text-xs text-gray-400 mt-2">Vai trò hệ thống</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-2xl shadow-lg">
                <Icon name="shield" className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <Icon name="dashboard" className="w-6 h-6 text-indigo-600" />
            <span>Quick Actions</span>
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <a
              href="/admin/users"
              className="group p-6 border-2 border-indigo-200 rounded-xl hover:border-indigo-400 hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 transform hover:scale-[1.02]"
            >
              <div className="flex items-center gap-4">
                <div className="bg-indigo-100 group-hover:bg-indigo-200 p-4 rounded-xl transition-colors">
                  <Icon name="users" className="w-8 h-8 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg group-hover:text-indigo-600 transition-colors">Quản lý Users</h3>
                  <p className="text-sm text-gray-600 mt-1">Xem và quản lý tất cả người dùng</p>
                </div>
              </div>
            </a>
            <a
              href="/admin/roles"
              className="group p-6 border-2 border-purple-200 rounded-xl hover:border-purple-400 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 transition-all duration-300 transform hover:scale-[1.02]"
            >
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 group-hover:bg-purple-200 p-4 rounded-xl transition-colors">
                  <Icon name="shield" className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg group-hover:text-purple-600 transition-colors">Quản lý Roles</h3>
                  <p className="text-sm text-gray-600 mt-1">Xem và quản lý các vai trò</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
