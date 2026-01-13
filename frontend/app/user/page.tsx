"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { profileApi, logout } from "../services/api";
import Icon from "../components/Icon";

export default function UserPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    loadProfile();
  }, [router]);

  const loadProfile = async () => {
    try {
      const data = await profileApi.getProfile();
      setProfile(data);
    } catch (e: any) {
      console.error("Error loading profile", e);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <Icon name="spinner" className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <nav className="bg-white/95 backdrop-blur-lg shadow-xl sticky top-0 z-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                User Dashboard
              </h1>
              <p className="text-sm text-gray-600 mt-1">Thông tin tài khoản của bạn</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 font-semibold"
            >
              <Icon name="signOut" className="w-5 h-5" />
              <span className="hidden sm:inline">Đăng xuất</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10">
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-6 md:p-8 animate-scale-in border border-white/20">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8 flex items-center gap-3">
            <Icon name="user" className="w-8 h-8 text-indigo-600" />
            <span>Thông tin tài khoản</span>
          </h2>
          {profile && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-6 border-2 border-indigo-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-slide-in">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-4 rounded-2xl shadow-lg">
                    <Icon name="envelope" className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">Email</p>
                    <p className="text-lg font-bold text-gray-800 break-all">{profile.email}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border-2 border-purple-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-slide-in" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-2xl shadow-lg">
                    <Icon name="lock" className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">Role</p>
                    <p className="text-lg font-bold text-gray-800">
                      <span className="px-3 py-1 bg-purple-200 text-purple-800 rounded-lg text-sm">
                        {profile.roleName}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className={`md:col-span-2 rounded-2xl p-6 border-2 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-slide-in ${
                profile.enabled 
                  ? "bg-gradient-to-br from-green-50 to-emerald-100 border-green-200" 
                  : "bg-gradient-to-br from-red-50 to-red-100 border-red-200"
              }`} style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-2xl shadow-lg ${
                    profile.enabled 
                      ? "bg-gradient-to-br from-green-500 to-emerald-600" 
                      : "bg-gradient-to-br from-red-500 to-red-600"
                  }`}>
                    <Icon name={profile.enabled ? "checkCircle" : "triangleExclamation"} className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">Trạng thái</p>
                    <p className={`text-lg font-bold ${
                      profile.enabled ? "text-green-700" : "text-red-700"
                    }`}>
                      {profile.enabled ? "✓ Đang hoạt động" : "✗ Đã vô hiệu"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
