import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../baseurl";
import LoadingButton from "../components/LoadingButton";

export default function UpdateAdmin() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (!admin) {
      window.location.href = "/admin/login"; // not logged in → redirect
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const res = await axios.put(`${BASE_URL}/admin/update/1`, formData, {
        withCredentials: true,
      });

      // Show success message
      setMessage(res.data.message || "Updated successfully!");
      setFormData({ username: "", password: "" });

      // Clear admin data and logout behind the scenes
      localStorage.removeItem("admin");
      await axios.post(`${BASE_URL}/admin/logout`, {}, { withCredentials: true });

      // Redirect after 3 seconds
      setTimeout(() => {
        window.location.href = "/admin/login"; // or "/admin" if you want admin dashboard
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-[#145A32] mb-6">
          Update Admin Credentials
        </h2>

        {message && <p className="text-green-600 text-center mb-4">{message}</p>}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Username
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
              New Password
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

          {/* Update button */}
          <LoadingButton
            type="submit"
            isLoading={loading}
            className="w-full bg-[#145A32] text-white py-2 rounded-lg hover:bg-green-700"
          >
            Update
          </LoadingButton>
        </form>
      </div>
    </div>
  );
}
