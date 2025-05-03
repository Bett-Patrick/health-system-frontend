import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
    const [role, setRole] = useState(localStorage.getItem("role") || "");  // Store the role here
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null; // Initialize user state from localStorage
      });
  
      const login = (token, userRole, userData) => {
        localStorage.setItem("token", token);
        localStorage.setItem("role", userRole); // Store the role in localStorage
        localStorage.setItem("user", JSON.stringify(userData)); // Store the user object in localStorage
        setIsAuthenticated(true);
        setRole(userRole);  // Set the role in context
        setUser(userData);  // Set the user object in context
      };
  
      const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("user");
        setIsAuthenticated(false);
        setRole("");  // Clear the role from context
        setUser(null);  // Clear the user object from context
        window.location.href = "/";
      };
  
      useEffect(() => {
        setIsAuthenticated(!!localStorage.getItem("token"));
        setRole(localStorage.getItem("role") || "");  // On mount, set the role
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));  // Set the user from localStorage
        }
      }, []);
  
      return (
        <AuthContext.Provider value={{ isAuthenticated, role, user, login, logout }}>
          {children}
        </AuthContext.Provider>
      );
  };