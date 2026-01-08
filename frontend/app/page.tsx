"use client";

import { useEffect, useState } from "react";
import Modal from "./components/Modal";
import StudentForm from "./components/StudentForm";

const API_URL = "http://localhost:8080/students";

type Student = {
  id: number;
  name: string;
  age: number;
  email: string;
  avatar?: string;
};

export default function HomePage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState<Student | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const loadData = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setStudents(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async (formData: FormData) => {
    await fetch(API_URL, { method: "POST", body: formData });
    setOpenForm(false);
    loadData();
  };

  const handleUpdate = async (formData: FormData) => {
    if (!editing) return;
    await fetch(`${API_URL}/${editing.id}`, {
      method: "PUT",
      body: formData,
    });
    setEditing(null);
    setOpenForm(false);
    loadData();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await fetch(`${API_URL}/${deleteId}`, { method: "DELETE" });
    setDeleteId(null);
    loadData();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Student Management</h1>
          <button
            onClick={() => {
              setEditing(null);
              setOpenForm(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2"
          >
            <i className="fas fa-plus"></i>
            Add Student
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Avatar</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{s.id}</td>

                  <td className="px-4 py-3">
                    {s.avatar ? (
                      <img
                        src={`http://localhost:8080/uploads/${s.avatar}`}
                        className="w-10 h-10 rounded-full object-cover border"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                        <i className="fas fa-user"></i>
                      </div>
                    )}
                  </td>

                  <td className="px-4 py-3 font-medium">{s.name}</td>
                  <td className="px-4 py-3">{s.email}</td>

                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => {
                        setEditing(s);
                        setOpenForm(true);
                      }}
                      className="text-blue-600 hover:text-blue-800 mr-4"
                    >
                      <i className="fas fa-pen"></i>
                    </button>

                    <button
                      onClick={() => setDeleteId(s.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {students.length === 0 && (
            <p className="text-center text-gray-500 mt-6">
              No students found
            </p>
          )}
        </div>
      </div>

      {/* Modal Form */}
      <Modal
        open={openForm}
        title={editing ? "Edit Student" : "Add Student"}
        onClose={() => setOpenForm(false)}
      >
        <StudentForm
          initialData={editing}
          onSubmit={editing ? handleUpdate : handleCreate}
        />
      </Modal>

      {/* Modal Delete */}
      <Modal
        open={!!deleteId}
        title="Confirm Delete"
        onClose={() => setDeleteId(null)}
      >
        <p className="mb-6">Are you sure you want to delete this student?</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setDeleteId(null)}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}
