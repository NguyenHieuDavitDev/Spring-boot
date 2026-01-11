"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthCard from "../components/AuthCard";
import { register } from "../services/auth";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      setLoading(true);
      setError("");
      await register(email, password);
      router.push(`/verify-otp?email=${email}&type=register`);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Tạo tài khoản"
      subtitle="Bắt đầu hành trình của bạn"
    >
      <input
        className="border rounded-xl w-full p-3 mb-3 focus:ring-2 focus:ring-indigo-500 outline-none"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="border rounded-xl w-full p-3 mb-4 focus:ring-2 focus:ring-indigo-500 outline-none"
        placeholder="Mật khẩu"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleRegister}
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold"
      >
        {loading ? "Đang gửi OTP..." : "Đăng ký"}
      </button>

      {error && (
        <p className="text-red-500 text-center mt-4 text-sm">
          {error}
        </p>
      )}
    </AuthCard>
  );
}
