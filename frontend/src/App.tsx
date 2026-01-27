import StudentPage from "./pages/StudentPage";
import AdminLayout from "./components/layout/AdminLayout";
import "./styles/admin.css";

function App() {
  return (
    <AdminLayout>
      <StudentPage />
    </AdminLayout>
  );
}

export default App;
