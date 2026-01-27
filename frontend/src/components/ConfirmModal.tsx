interface Props {
    show: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
  }
  
  export default function ConfirmModal({
    show,
    title,
    message,
    onConfirm,
    onCancel,
  }: Props) {
    if (!show) return null;
  
    return (
      <div className="modal fade show d-block bg-dark bg-opacity-50">
        <div className="modal-dialog">
          <div className="modal-content shadow">
            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title">
                <i className="fas fa-exclamation-triangle me-2"></i>
                {title}
              </h5>
            </div>
            <div className="modal-body">{message}</div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onCancel}>
                Huỷ
              </button>
              <button className="btn btn-danger" onClick={onConfirm}>
                Xoá
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  