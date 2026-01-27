import axios from "axios";
import type { StudentRequest } from "../types/student";

export const API_BASE_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
});

const toFormData = (data: StudentRequest, image?: File) => {
  const fd = new FormData();

  fd.append("middleName", data.middleName);
  fd.append("firstName", data.firstName);
  fd.append("cccd", data.cccd);
  fd.append("gender", data.gender);
  fd.append("dateOfBirth", data.dateOfBirth);
  fd.append("status", data.status);

  if (image) fd.append("image", image);

  return fd;
};

export const getStudents = () => api.get("/students");

export const createStudent = (data: StudentRequest, image?: File) =>
  api.post("/students", toFormData(data, image));

export const updateStudent = (id: number, data: StudentRequest, image?: File) =>
  api.put(`/students/${id}`, toFormData(data, image));

export const deleteStudent = (id: number) =>
  api.delete(`/students/${id}`);
