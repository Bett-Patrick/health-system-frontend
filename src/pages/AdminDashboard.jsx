import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">ADMIN DASHBOARD</h1>
      <h2 className="text-2xl font-semibold mt-2">Welcome {user?.username}</h2>
      <p className="mt-1 text-gray-600">Your role: {user?.role}</p>

      <div className="mt-4">
        <NavLink
          to="/register-doctor"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Register Doctor
        </NavLink>
      </div>
    </div>
  );
};

export default AdminDashboard;
