"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Icon from "../components/Icon";
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
  const [countdown, setCountdown] = useState(300); // 5 minutes

  // Chặn truy cập trực tiếp
  useEffect(() => {
    if (!email || !type) {
      router.replace("/login");
    }
  }, [email, type, router]);

  // Countdown timer - reset khi vào trang
  useEffect(() => {
    if (email && type) {
      setCountdown(300); // Reset về 5 phút khi vào trang
    }
  }, [email, type]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleVerify = async () => {
    if (!otp || otp.trim().length !== 6) {
      setError("Vui lòng nhập đầy đủ 6 số OTP");
      return;
    }

    // Chỉ cho phép số
    if (!/^\d{6}$/.test(otp)) {
      setError("Mã OTP chỉ được chứa số");
      return;
    }

    if (countdown === 0) {
      setError("Mã OTP đã hết hạn. Vui lòng yêu cầu mã mới.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const decodedEmail = decodeURIComponent(email!);
      const data = await verifyOtp(decodedEmail, otp.trim());

      // OTP đăng ký
      if (type === "register") {
        router.push("/login?success=1");
        return;
      }

      // OTP đăng nhập
      if (type === "login") {
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        if (data.role === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/user");
        }
      }
    } catch (e: any) {
      setError(e.message || "OTP không hợp lệ hoặc đã hết hạn");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && otp.length === 6 && !loading) {
      handleVerify();
    }
  };

  return (
    <AuthCard
      title="Xác thực OTP"
      subtitle={`Mã OTP đã được gửi tới ${email}`}
    >
      <div className="space-y-6">
        <div className="text-center">
          <div className="flex justify-center gap-2 mb-4">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <div
                key={index}
                className={`w-12 h-14 md:w-14 md:h-16 border-2 rounded-xl flex items-center justify-center text-2xl md:text-3xl font-bold transition-all ${
                  otp[index]
                    ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                    : "border-gray-300 bg-gray-50 text-gray-400"
                } ${countdown === 0 ? "border-red-300" : ""}`}
              >
                {otp[index] || ""}
              </div>
            ))}
          </div>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className="absolute opacity-0 pointer-events-none"
            maxLength={6}
            value={otp}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              setOtp(value);
              setError("");
            }}
            onKeyPress={handleKeyPress}
            disabled={loading}
            autoFocus
          />
          <p className="text-sm text-gray-600 mt-4">
            Nhập 6 số OTP từ email của bạn
          </p>
        </div>

        {countdown > 0 && (
          <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-2 text-sm font-medium text-indigo-700">
              <Icon name="clock" className="w-5 h-5 text-indigo-600 animate-pulse" />
              <span>Mã OTP còn hiệu lực trong:{" "}
                <span className="font-bold text-lg text-indigo-600">
                  {formatTime(countdown)}
                </span>
              </span>
            </div>
          </div>
        )}

        {countdown === 0 && (
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4 text-center animate-shake">
            <div className="flex items-center justify-center gap-2 text-sm font-medium text-yellow-700">
              <Icon name="triangleExclamation" className="w-5 h-5 text-yellow-600" />
              <span>Mã OTP đã hết hạn. Vui lòng thử lại.</span>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={handleVerify}
        disabled={loading || otp.length !== 6 || countdown === 0}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] mt-6 shadow-lg hover:shadow-xl disabled:shadow-none"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Icon name="spinner" className="w-5 h-5 animate-spin" />
            <span>Đang xác thực...</span>
          </span>
        ) : (
          "Xác nhận OTP"
        )}
      </button>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-lg mt-4 text-center animate-shake flex items-center justify-center gap-2">
          <Icon name="triangleExclamation" className="text-red-600" />
          <span>{error}</span>
        </div>
      )}

      <p className="text-center text-sm text-gray-500 mt-4">
        Không nhận được mã?{" "}
        <a
          href={type === "login" ? "/login" : "/register"}
          className="text-indigo-600 hover:text-indigo-700 font-semibold"
        >
          Thử lại
        </a>
      </p>
    </AuthCard>
  );
}
