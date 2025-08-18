import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../baseurl";
import LoadingButton from "../components/LoadingButton"; // ✅ import reusable button

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.post(`${BASE_URL}/admin/logout`, {}, { withCredentials: true });
      localStorage.removeItem("admin");
      window.location.href = "/login";
    } catch (err) {
      alert("❌ Logout failed. Try again.");
      setLoading(false); // reset only if failed
    }
  };

  return (
    <LoadingButton
      onClick={handleLogout}
      isLoading={loading}
      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 w-full"
    >
      Logout
    </LoadingButton>
  );
}
