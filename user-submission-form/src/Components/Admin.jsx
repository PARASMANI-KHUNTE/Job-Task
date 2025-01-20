import { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';
const Admin = () => {
    const navigate =  useNavigate()
    const [formData, setFormData] = useState({ username: "", password: "" });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post("http://localhost:5000/api/admin/admin-login", formData); // Send formData directly
        const { token } = response.data;
    
        // Store token in localStorage or cookie
        localStorage.setItem("adminToken", token);
    
        toast.success("Login successful!");
        navigate('/Dashboard')
      } catch (error) {
        console.error("Login error:", error.response?.data?.error || error.message);
        toast.error(error.response?.data?.error || "Login failed!");
      }
    };
    

  return (
    <>
    <Navbar />
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-purple-700">Admin Login</h1>

        {/* Username Input */}
        <div className="mb-4">
          <label htmlFor="username" className="text-purple-500 block text-sm font-medium mb-1">
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter your username"
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label htmlFor="password" className="text-purple-500 block text-sm font-medium mb-1">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter your password"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition"
        >
          Login
        </button>
      </form>
    </div>
    </>
  );
};

export default Admin;
