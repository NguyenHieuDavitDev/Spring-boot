"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import StudentForm from "../../components/StudentForm";
import { API_URL } from "../../lib/api";

export default function EditPage() {
  const { id } = useParams();
  const router = useRouter();
  const [student, setStudent] = useState<any>(null);

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then((res) => res.json())
      .then(setStudent);
  }, [id]);

  const handleUpdate = async (formData: FormData) => {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      body: formData,
    });
    router.push("/");
  };

  if (!student) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Sửa Student</h1>
      <StudentForm initialData={student} onSubmit={handleUpdate} />
    </div>
  );
}
