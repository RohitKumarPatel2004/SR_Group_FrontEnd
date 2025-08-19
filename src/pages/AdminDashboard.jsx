import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../baseurl";
import {
  FaUsers,
  FaBlog,
  FaQuestionCircle,
  FaHome,
  FaStar,
  FaSignOutAlt
} from "react-icons/fa";

const AdminDashboard = () => {
  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/admin/logout`, {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout failed", err);
    }
    localStorage.removeItem("admin");
    window.location.href = "/admin/login";
  };

  return (
    <div className="min-h-screen bg-white p-8 relative">
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
      >
        <FaSignOutAlt />
        Logout
      </button>

      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-green-600 mb-2">Admin Panel</h1>
        <p className="text-yellow-600 text-lg">
          Manage your clients, blogs, FAQs, and properties
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Link
          to="/admin/clients"
          className="rounded-2xl shadow-lg hover:shadow-xl transition duration-300 border border-green-100 bg-green-50 p-6 hover:bg-green-100"
        >
          <div className="flex items-center gap-4">
            <div className="text-green-600 text-4xl">
              <FaUsers />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-green-800">Manage Clients</h2>
              <p className="text-sm text-green-700">
                View, export or delete support queries
              </p>
            </div>
          </div>
        </Link>

        <Link
          to="/admin/manage-blogs"
          className="rounded-2xl shadow-lg hover:shadow-xl transition duration-300 border border-yellow-100 bg-yellow-50 p-6 hover:bg-yellow-100"
        >
          <div className="flex items-center gap-4">
            <div className="text-yellow-600 text-4xl">
              <FaBlog />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-yellow-800">Manage Blogs</h2>
              <p className="text-sm text-yellow-700">
                Add, edit, or remove blog posts
              </p>
            </div>
          </div>
        </Link>

        <Link
          to="/admin/manage-faqs"
          className="rounded-2xl shadow-lg hover:shadow-xl transition duration-300 border border-blue-100 bg-blue-50 p-6 hover:bg-blue-100"
        >
          <div className="flex items-center gap-4">
            <div className="text-blue-600 text-4xl">
              <FaQuestionCircle />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-blue-800">Manage FAQs</h2>
              <p className="text-sm text-blue-700">Add, edit, or delete FAQs</p>
            </div>
          </div>
        </Link>

        <Link
          to="/admin/manage-properties"
          className="rounded-2xl shadow-lg hover:shadow-xl transition duration-300 border border-red-100 bg-red-50 p-6 hover:bg-red-100"
        >
          <div className="flex items-center gap-4">
            <div className="text-red-600 text-4xl">
              <FaHome />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-red-800">Manage Properties</h2>
              <p className="text-sm text-red-700">
                Add, edit, or remove property listings
              </p>
            </div>
          </div>
        </Link>

        <Link
          to="/admin/manage-reviews"
          className="rounded-2xl shadow-lg hover:shadow-xl transition duration-300 border border-white bg-white p-6 hover:bg-gray-50"
        >
          <div className="flex items-center gap-4">
            <div className="text-black text-4xl">
              <FaStar />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-black">Manage Reviews</h2>
              <p className="text-sm text-gray-600">
                Approve or delete client feedback
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
