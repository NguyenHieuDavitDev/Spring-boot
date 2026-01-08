"use client";

import { useRouter } from "next/navigation";
import StudentForm from "../components/StudentForm";
import { API_URL } from "../lib/api";

export default function CreatePage() {
  const router = useRouter();

  const handleCreate = async (formData: FormData) => {
    await fetch(API_URL, {
      method: "POST",
      body: formData,
    });
    router.push("/");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Thêm Student</h1>
      <StudentForm onSubmit={handleCreate} />
    </div>
  );
}
