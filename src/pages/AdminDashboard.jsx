import { NavLink } from "react-router-dom";

const AdminDashboard = () => {
    const user = JSON.parse(localStorage.getItem("user"));
  
    return (
      <div className="p-4">
        <h1>ADMIN DASHBOARD</h1>
        <h2 className="text-2xl font-bold mb-4">Welcome, {user?.username}</h2>
        <p>Your role: {user?.role}</p>
        {/* Add links to create program, view clients, etc */}
        <NavLink to="/register-doctor" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Register Doctor
        </NavLink>
      </div>
    );
  };
  
  export default AdminDashboard;
  