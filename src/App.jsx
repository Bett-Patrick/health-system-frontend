// src/App.jsx
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import LoginPage from "./pages/LoginPage";
import DoctorDashboard from "./pages/DoctorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import RegisterDoctor from "./pages/RegisterDoctor";
import RegisterAdmin from "./pages/RegisterAdmin";
import Unauthorized from "./pages/Unauthorized";
import { useEffect, useState } from "react";
import { checkAdminExists } from "./utils/checkAdmin";

function App() {
  const [loading, setLoading] = useState(true);
  const [adminExists, setAdminExists] = useState(null);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      const exists = await checkAdminExists();
      setAdminExists(exists);
      setLoading(false);
    };
    fetchAdminStatus();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Checking system setup...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={adminExists ? <LoginPage /> : <RegisterAdmin />} />
        <Route
          path="/doctor/dashboard"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register-doctor"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <RegisterDoctor />
            </ProtectedRoute>
          }
        />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Route>
    </Routes>
  );
}

export default App;
