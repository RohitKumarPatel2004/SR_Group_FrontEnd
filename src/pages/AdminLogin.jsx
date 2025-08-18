// src/pages/AdminLogin.jsx
import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../baseurl";
import LoadingButton from "../components/LoadingButton"; // ✅ use your custom button

export default function AdminLogin() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // ✅ loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}/admin/login`, formData, {
        withCredentials: true,
      });
      console.log(res);

      localStorage.setItem("admin", JSON.stringify(res.data.admin));
      setMessage("Login successful! Redirecting...");
      setTimeout(() => (window.location.href = "/admin"), 1500);
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>

        {error && <p className="text-red-500 text-center mb-3">{error}</p>}
        {message && <p className="text-green-600 text-center mb-3">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          {/* ✅ Use LoadingButton */}
          <LoadingButton
            type="submit"
            isLoading={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Login
          </LoadingButton>
        </form>
      </div>
    </div>
  );
}
