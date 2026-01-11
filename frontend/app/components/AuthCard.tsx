import React from "react";

export default function AuthCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          {title}
        </h1>

        {subtitle && (
          <p className="text-center text-gray-500 mt-2 mb-6">
            {subtitle}
          </p>
        )}

        {children}
      </div>
    </div>
  );
}
