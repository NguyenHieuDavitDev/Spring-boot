"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "../components/Icon";
import AuthCard from "../components/AuthCard";
import { register } from "../services/auth";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async () => {
    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (!validateEmail(email)) {
      setError("Email không hợp lệ");
      return;
    }

    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await register(email.trim().toLowerCase(), password);
      router.push(`/verify-otp?email=${encodeURIComponent(email.trim().toLowerCase())}&type=register`);
    } catch (e: any) {
      setError(e.message || "Đăng ký thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) {
      handleRegister();
    }
  };

  return (
    <AuthCard
      title="Tạo tài khoản"
      subtitle="Bắt đầu hành trình của bạn"
    >
      <div className="space-y-5">
        <div className="relative">
          <input
            type="email"
            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-gray-50 focus:bg-white text-gray-800 placeholder-gray-400"
            placeholder="Nhập email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
          />
          <Icon name="envelope" className="absolute left-4 top-4.5 w-5 h-5 text-gray-400" />
        </div>

        <div className="relative">
          <input
            type="password"
            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-gray-50 focus:bg-white text-gray-800 placeholder-gray-400"
            placeholder="Mật khẩu (tối thiểu 6 ký tự)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
          />
          <Icon name="lock" className="absolute left-4 top-4.5 w-5 h-5 text-gray-400" />
        </div>
      </div>

      <button
        onClick={handleRegister}
        disabled={loading || !email || !password}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] mt-6 shadow-lg hover:shadow-xl disabled:shadow-none"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Icon name="spinner" className="w-5 h-5 animate-spin" />
            <span>Đang gửi OTP...</span>
          </span>
        ) : (
          "Đăng ký"
        )}
      </button>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-lg mt-4 text-center animate-shake flex items-center justify-center gap-2">
          <Icon name="triangleExclamation" className="text-red-600" />
          <span>{error}</span>
        </div>
      )}

      <p className="text-center text-sm text-gray-500 mt-4">
        Đã có tài khoản?{" "}
        <a href="/login" className="text-indigo-600 hover:text-indigo-700 font-semibold">
          Đăng nhập ngay
        </a>
      </p>
    </AuthCard>
  );
}
