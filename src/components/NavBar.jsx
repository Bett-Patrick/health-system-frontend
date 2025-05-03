import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    if (isAuthenticated) {
      logout();
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex flex-row justify-between items-center w-full h-20 bg-slate-400 px-3">
      <h1 className="text-5xl text-left font-bold">H<span className="text-red-500">I</span>S</h1>
      <button
        onClick={handleClick}
        className="bg-red-500 text-slate-50 font-bold rounded-md px-3"
      >
        {isAuthenticated ? "Logout" : "Login"}
      </button>
    </div>
  );
};

export default NavBar;
