const API_URL = "http://localhost:8080/api/auth";

async function handleResponse(res: Response) {
  const contentType = res.headers.get("content-type");
  
  if (!res.ok) {
    if (contentType && contentType.includes("application/json")) {
      const errorData = await res.json();
      // Xử lý validation errors
      if (errorData.errors) {
        const errorMessages = Object.values(errorData.errors).join(", ");
        throw new Error(errorMessages || errorData.message || "Dữ liệu không hợp lệ");
      }
      throw new Error(errorData.message || "Đã xảy ra lỗi");
    } else {
      const errorText = await res.text();
      throw new Error(errorText || "Đã xảy ra lỗi");
    }
  }
  
  return res.json();
}

export async function register(email: string, password: string) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  return handleResponse(res);
}

export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  return handleResponse(res);
}

export async function verifyOtp(email: string, otp: string) {
  const res = await fetch(`${API_URL}/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });

  return handleResponse(res);
}

