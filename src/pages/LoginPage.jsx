import { useState } from "react";
import axios from "../axios/axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/login", credentials);
      console.log("Login response : "+JSON.stringify(res.data.user.role))
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      if (res.data.user.role === "admin") {
        navigate("/admin/dashboard");
      }else if(res.data.user.role === "doctor"){
        navigate("/doctor/dashboard")
      }
     
    } catch (err) {
      console.log(err.message)
      alert(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input name="email" placeholder="Email" onChange={handleChange} required className="border p-2"/>
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="border p-2"/>
        <button type="submit" className="bg-green-600 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
