import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const DoctorDashboard = () => {
  const { user } = useContext(AuthContext);
  console.log(user)

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">DOCTOR DASHBOARD</h1>
      <h2 className="text-2xl font-semibold mt-2">Welcome Dr. {user?.username}</h2>
      <p className="mt-1 text-gray-600">Your role: {user?.role}</p>

      {/* Add doctor-specific features here */}
    </div>
  );
};

export default DoctorDashboard;
