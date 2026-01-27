interface Props {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: Props) {
  return (
    <aside
      className={`sidebar bg-dark text-white d-flex flex-column ${
        collapsed ? "sidebar-collapsed" : ""
      }`}
    >
      <div className="d-flex align-items-center justify-content-between py-3 px-3 border-bottom">
        <div className="d-flex align-items-center">
          <i className="fas fa-school me-2"></i>
          <span className="sidebar-title-text">Admin</span>
        </div>
        <button
          type="button"
          className="btn btn-sm btn-outline-light sidebar-toggle-btn"
          onClick={onToggle}
        >
          <i className={`fas ${collapsed ? "fa-chevron-right" : "fa-chevron-left"}`}></i>
        </button>
      </div>

      <ul className="nav flex-column px-2 mt-2">
        <li className="nav-item">
          <a className="nav-link text-white active">
            <i className="fas fa-user-graduate me-2"></i>
            <span className="sidebar-link-text">Sinh viên</span>
          </a>
        </li>
      </ul>
    </aside>
  );
}
