import { useEffect, useState } from "react";
import { getStudents, createStudent, updateStudent, deleteStudent } from "../api/studentApi";
import type { StudentRequest, StudentResponse } from "../types/student";
import StudentFormModal from "../components/StudentFormModal";
import ConfirmModal from "../components/ConfirmModal";
import ImagePreview from "../components/ImagePreview";
import StudentDetailModal from "../components/StudentDetailModal";

export default function StudentPage() {
  const [students, setStudents] = useState<StudentResponse[]>([]);
  const [selected, setSelected] = useState<StudentResponse | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const loadData = () =>
    getStudents().then((res) => setStudents(res.data));

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = (data: StudentRequest, image?: File) => {
    const api = selected
      ? updateStudent(selected.id, data, image)
      : createStudent(data, image);

    api.then(() => {
      setShowForm(false);
      setSelected(null);
      loadData();
    });
  };

  const handleDelete = () => {
    if (!selected) return;
    deleteStudent(selected.id).then(() => {
      setShowConfirm(false);
      setSelected(null);
      loadData();
    });
  };

  return (
    <div className="container-fluid p-0">
      <div className="card shadow-sm mt-3">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h4 className="mb-0">
            <i className="fas fa-user-graduate me-2"></i>
            Quản lý sinh viên
          </h4>
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(true)}
          >
            <i className="fas fa-plus me-1"></i> Thêm mới
          </button>
        </div>

        <div className="card-body">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Ảnh</th>
                <th>Họ tên</th>
                <th>CCCD</th>
                <th>Giới tính</th>
                <th>Trạng thái</th>
                <th className="text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <tr
                  key={s.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setSelected(s);
                    setShowDetail(true);
                  }}
                >
                  <td>{i + 1}</td>
                  <td>
                    <ImagePreview imageUrl={s.imageUrl} />
                  </td>
                  <td>{s.fullName}</td>
                  <td>{s.cccd}</td>
                  <td>{s.gender}</td>
                  <td>
                    <span className="badge bg-info">{s.status}</span>
                  </td>
                  <td className="text-center">
                    <button
                      type="button"
                      className="btn btn-sm btn-warning me-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelected(s);
                        setShowForm(true);
                      }}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelected(s);
                        setShowConfirm(true);
                      }}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <StudentFormModal
        show={showForm}
        onClose={() => {
          setShowForm(false);
          setSelected(null);
        }}
        initialData={selected}
        onSubmit={handleSave}
      />

      <ConfirmModal
        show={showConfirm}
        title="Xác nhận xoá"
        message="Bạn có chắc chắn muốn xoá sinh viên này không?"
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleDelete}
      />

      <StudentDetailModal
        show={showDetail}
        student={selected}
        onClose={() => setShowDetail(false)}
      />
    </div>
  );
}
