"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AuthCard from "../components/AuthCard";
import { login } from "../services/auth";

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();

  const success = params.get("success");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

const handleLogin = async () => {
  try {
    setError("");
    const data = await login(email, password);

    if (data.otpRequired) {
      router.push(`/verify-otp?email=${email}&type=login`);
    }
  } catch (e: any) {
    setError(e.message);
  }
};


  return (
    <AuthCard
      title="Đăng nhập"
      subtitle="Chào mừng bạn quay lại"
    >
      {success && (
        <div className="bg-green-100 text-green-700 text-sm p-3 rounded-lg mb-4 text-center">
          Đăng ký tài khoản thành công. Vui lòng đăng nhập!
        </div>
      )}

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
        onClick={handleLogin}
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition"
      >
        {loading ? "Đang gửi OTP..." : "Đăng nhập"}
      </button>

      {error && (
        <p className="text-red-500 text-center mt-4 text-sm">
          {error}
        </p>
      )}
    </AuthCard>
  );
}
