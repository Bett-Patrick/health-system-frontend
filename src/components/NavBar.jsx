import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const NavBar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleClick = () => {
    if (isLoggedIn) {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      navigate("/"); // Redirect to login
    } else {
      navigate("/"); // Just redirect to login
    }
  };

  return (
    <div className="flex flex-row justify-between items-center w-full h-20 bg-gray-300 px-3">
      <h1 className="text-5xl text-left font-bold">
        H<span className="text-red-500">I</span>S
      </h1>
      <button
        onClick={handleClick}
        className={isLoggedIn? "bg-red-500 text-slate-50 font-bold rounded-md px-3" : "bg-blue-500 text-slate-50 font-bold rounded-md px-3"}
      >
        {isLoggedIn ? "Logout" : "Login"}
      </button>
    </div>
  );
};

export default NavBar;
