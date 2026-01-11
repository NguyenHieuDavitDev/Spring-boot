"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AuthCard from "../components/AuthCard";
import { verifyOtp } from "../services/auth";

export default function VerifyOtpPage() {
  const router = useRouter();
  const params = useSearchParams();

  const email = params.get("email");
  const type = params.get("type"); // register | login

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Chặn truy cập trực tiếp
  useEffect(() => {
    if (!email || !type) {
      router.replace("/login");
    }
  }, [email, type, router]);

  const handleVerify = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await verifyOtp(email!, otp);

      // OTP đăng ký
      if (type === "register") {
        router.push("/login?success=1");
        return;
      }

      // OTP đăng nhập
      if (type === "login") {
        localStorage.setItem("token", data.token);

        if (data.role === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/user");
        }
      }
    } catch (e: any) {
      setError(e.message || "OTP không hợp lệ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Xác thực OTP"
      subtitle={`Mã OTP đã được gửi tới ${email}`}
    >
      <input
        className="border rounded-xl w-full p-4 mb-4 text-center tracking-widest text-2xl focus:ring-2 focus:ring-indigo-500 outline-none"
        placeholder="••••••"
        maxLength={6}
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <button
        onClick={handleVerify}
        disabled={loading || otp.length !== 6}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition"
      >
        {loading ? "Đang xác thực..." : "Xác nhận"}
      </button>

      {error && (
        <p className="text-red-500 text-center mt-4 text-sm">
          {error}
        </p>
      )}
    </AuthCard>
  );
}
