const API_URL = "http://localhost:8080/api";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
}

async function handleResponse(res: Response) {
  const contentType = res.headers.get("content-type");
  
  if (!res.ok) {
    if (contentType && contentType.includes("application/json")) {
      const errorData = await res.json();
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

// Role APIs
export const roleApi = {
  getAll: async () => {
    const res = await fetch(`${API_URL}/admin/roles`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },
  getById: async (id: number) => {
    const res = await fetch(`${API_URL}/admin/roles/${id}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },
  create: async (data: { name: string }) => {
    const res = await fetch(`${API_URL}/admin/roles`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },
  update: async (id: number, data: { name: string }) => {
    const res = await fetch(`${API_URL}/admin/roles/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },
  delete: async (id: number) => {
    const res = await fetch(`${API_URL}/admin/roles/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },
};

// User APIs
export const userApi = {
  getAll: async () => {
    const res = await fetch(`${API_URL}/admin/users`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },
  getById: async (id: number) => {
    const res = await fetch(`${API_URL}/admin/users/${id}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },
  create: async (data: { email: string; password: string; roleId: number }) => {
    const res = await fetch(`${API_URL}/admin/users`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },
  update: async (id: number, data: { email: string; password?: string; roleId: number }) => {
    const res = await fetch(`${API_URL}/admin/users/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },
  delete: async (id: number) => {
    const res = await fetch(`${API_URL}/admin/users/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },
  toggleStatus: async (id: number) => {
    const res = await fetch(`${API_URL}/admin/users/${id}/toggle-status`, {
      method: "PATCH",
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },
};

// User Profile API
export const profileApi = {
  getProfile: async () => {
    const res = await fetch(`${API_URL}/user/profile`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },
};

// Logout
export const logout = async () => {
  const res = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
};
