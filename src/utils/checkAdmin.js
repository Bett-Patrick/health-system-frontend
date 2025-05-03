// src/utils/checkAdmin.js
import axiosInstance from "../axios/axios";

export const checkAdminExists = async () => {
  try {
    const response = await axiosInstance.get("/check-admin");
    return response.data.admin_exists;
  } catch (error) {
    console.error("Error checking admin existence:", error);
    return false; // default to false to avoid blocking registration
  }
};
