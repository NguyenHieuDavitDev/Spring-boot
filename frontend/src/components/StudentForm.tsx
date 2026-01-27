import { useForm } from "react-hook-form";
import type { StudentRequest, Gender, StudentStatus } from "../types/student";

interface Props {
  onSubmit: (data: StudentRequest, image?: File) => void;
  initialData?: StudentRequest;
}

export default function StudentForm({ onSubmit, initialData }: Props) {
  const { register, handleSubmit } = useForm<StudentRequest>({
    defaultValues: initialData,
  });

  let selectedImage: File | undefined;

  return (
    <form
      onSubmit={handleSubmit((data) =>
        onSubmit(data, selectedImage)
      )}
    >
      <input {...register("middleName")} placeholder="Họ lót" />
      <input {...register("firstName")} placeholder="Tên" />
      <input {...register("cccd")} placeholder="CCCD" />

      <select {...register("gender")}>
        <option value="MALE">Nam</option>
        <option value="FEMALE">Nữ</option>
        <option value="OTHER">Khác</option>
      </select>

      <input type="date" {...register("dateOfBirth")} />

      <select {...register("status")}>
        <option value="STUDYING">Đang học</option>
        <option value="PAUSED">Tạm dừng</option>
        <option value="GRADUATED">Tốt nghiệp</option>
      </select>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files) {
            selectedImage = e.target.files[0];
          }
        }}
      />

      <button type="submit">Lưu</button>
    </form>
  );
}
