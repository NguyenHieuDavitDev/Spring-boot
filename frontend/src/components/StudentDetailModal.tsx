import type { StudentResponse } from "../types/student";
import ImagePreview from "./ImagePreview";

interface Props {
  show: boolean;
  student: StudentResponse | null;
  onClose: () => void;
}

export default function StudentDetailModal({ show, student, onClose }: Props) {
  if (!show || !student) return null;

  return (
    <div className="modal fade show d-block bg-dark bg-opacity-50">
      <div className="modal-dialog modal-lg">
        <div className="modal-content shadow">
          <div className="modal-header bg-info text-white">
            <h5 className="modal-title">
              <i className="fas fa-user-graduate me-2"></i>
              Thông tin sinh viên
            </h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">
            <div className="row g-3">
              <div className="col-12 d-flex align-items-center mb-3">
                <ImagePreview imageUrl={student.imageUrl} />
                <div className="ms-3">
                  <h5 className="mb-1">{student.fullName}</h5>
                  <span className="badge bg-secondary me-2">
                    CCCD: {student.cccd}
                  </span>
                  <span className="badge bg-primary me-2">
                    {student.gender}
                  </span>
                  <span className="badge bg-success">{student.status}</span>
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Họ tên</label>
                <div className="form-control-plaintext">{student.fullName}</div>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">CCCD</label>
                <div className="form-control-plaintext">{student.cccd}</div>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Giới tính</label>
                <div className="form-control-plaintext">{student.gender}</div>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Ngày sinh</label>
                <div className="form-control-plaintext">
                  {student.dateOfBirth}
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Trạng thái</label>
                <div className="form-control-plaintext">{student.status}</div>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

