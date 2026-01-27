import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { StudentRequest, StudentResponse } from "../types/student";
import ImagePreview from "./ImagePreview";

interface Props {
  show: boolean;
  onClose: () => void;
  onSubmit: (data: StudentRequest, image?: File) => void;
  initialData?: StudentResponse | null;
}

export default function StudentFormModal({
  show,
  onClose,
  onSubmit,
  initialData,
}: Props) {
  const { register, handleSubmit, reset } = useForm<StudentRequest>();
  const [image, setImage] = useState<File>();

  useEffect(() => {
    if (initialData) {
      const parts = initialData.fullName.split(" ");
      reset({
        middleName: parts.slice(0, -1).join(" "),
        firstName: parts.at(-1) || "",
        cccd: initialData.cccd,
        gender: initialData.gender,
        dateOfBirth: initialData.dateOfBirth,
        status: initialData.status,
      });
    } else {
      reset();
    }
  }, [initialData]);

  if (!show) return null;

  return (
    <div className="modal fade show d-block bg-dark bg-opacity-50">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <form
            onSubmit={handleSubmit((d) => onSubmit(d, image))}
          >
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">
                {initialData ? "Cập nhật sinh viên" : "Thêm sinh viên"}
              </h5>
              <button type="button" className="btn-close" onClick={onClose} />
            </div>

            <div className="modal-body">
              <div className="row g-3">
                <div className="col-12 d-flex align-items-center mb-3">
                  <ImagePreview imageUrl={initialData?.imageUrl} file={image} />
                  <input
                    type="file"
                    className="form-control ms-3"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files?.[0])}
                  />
                </div>

                <div className="col-md-6">
                  <input
                    className="form-control"
                    placeholder="Họ lót"
                    {...register("middleName")}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    className="form-control"
                    placeholder="Tên"
                    {...register("firstName")}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    className="form-control"
                    placeholder="CCCD"
                    {...register("cccd")}
                  />
                </div>

                <div className="col-md-6">
                  <input
                    type="date"
                    className="form-control"
                    {...register("dateOfBirth")}
                  />
                </div>

                <div className="col-md-6">
                  <select className="form-select" {...register("gender")}>
                    <option value="MALE">Nam</option>
                    <option value="FEMALE">Nữ</option>
                    <option value="OTHER">Khác</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <select className="form-select" {...register("status")}>
                    <option value="STUDYING">Đang học</option>
                    <option value="PAUSED">Tạm dừng</option>
                    <option value="GRADUATED">Tốt nghiệp</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Huỷ
              </button>
              <button type="submit" className="btn btn-success">
                Lưu
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
