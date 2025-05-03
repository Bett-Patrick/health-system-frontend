// src/pages/LoginPage.jsx
import { useState, useContext } from "react";
import axios from "../axios/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const res = await axios.post("/login", credentials);
      const { token, user } = res.data;

      login(token, user.role, user); // Store the role in context
      setLoading(false)
      // Redirect based on role
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user.role === "doctor") {
        navigate("/doctor/dashboard");
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="border p-2"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="border p-2"
        />
        <button type="submit" disabled={loading} className="bg-green-600 text-white p-2 rounded hover:bg-gray-400 hover:font-bold">
          {loading? "Loging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
