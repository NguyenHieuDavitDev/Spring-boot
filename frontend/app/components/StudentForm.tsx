"use client";

import { useState } from "react";

type Props = {
  initialData?: any;
  onSubmit: (formData: FormData) => void;
};

export default function StudentForm({ initialData, onSubmit }: Props) {
  const [name, setName] = useState(initialData?.name || "");
  const [age, setAge] = useState(initialData?.age || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [avatar, setAvatar] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("age", age);
    formData.append("email", email);
    if (avatar) formData.append("avatar", avatar);

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm mb-1">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Age</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Avatar</label>

        {initialData?.avatar && (
          <img
            src={`http://localhost:8080/uploads/${initialData.avatar}`}
            className="w-16 h-16 rounded-full object-cover border mb-2"
          />
        )}

        <input
          type="file"
          onChange={(e) => setAvatar(e.target.files?.[0] || null)}
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>
    </form>
  );
}
