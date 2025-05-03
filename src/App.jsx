import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./Layout"
import LoginPage from "./pages/LoginPage"
import DoctorDashboard from "./pages/DoctorDashboard"
import AdminDashboard from "./pages/AdminDashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import RegisterDoctor from "./pages/RegisterDoctor"
import RegisterAdmin from "./pages/RegisterAdmin"
import { useEffect, useState } from "react"
import { checkAdminExists } from "./utils/checkAdmin"
import { ToastContainer } from "react-toastify"

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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={adminExists?<LoginPage/> : <RegisterAdmin/>}/>
          <Route path="/doctor/dashboard" element={
            <ProtectedRoute>
              <DoctorDashboard/>
            </ProtectedRoute>
          } />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <AdminDashboard/>
            </ProtectedRoute>
          } />
          <Route path="/register-doctor" element={<RegisterDoctor/>}/>
        </Route>
      </Routes>
      <ToastContainer/>
    </BrowserRouter>
  )
}

export default App
