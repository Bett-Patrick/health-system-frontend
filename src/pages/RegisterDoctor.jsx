import { useState } from "react";
import axios from "../axios/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterDoctor = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/register-doctor", formData);
      toast.success("Doctor registered successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Register Doctor</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input name="username" placeholder="Username" onChange={handleChange} required className="border p-2"/>
        <input name="email" placeholder="Email" onChange={handleChange} required className="border p-2"/>
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="border p-2"/>
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
};

export default RegisterDoctor;
