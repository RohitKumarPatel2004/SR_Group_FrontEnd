// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../baseurl"; // 👈 yaha import kar liya

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/admin/check`, {
          withCredentials: true, // cookie bhejne ke liye
        });
        if (res.data.success) {
          setAuthorized(true);
        }
      } catch (err) {
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Checking authentication...</div>;
  }

  if (!authorized) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
