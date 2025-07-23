import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, IMAGE_URL } from '../baseurl';


const ManageClientReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch all reviews
  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/review/all`);
      setReviews(res.data);
    } catch (err) {
      setMessage("❌ Failed to fetch reviews");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Approve or delete a review
  const handleAction = async (action, id) => {
    try {
      if (action === "approve") {
        await axios.put(`${BASE_URL}/review/status/${id}`, {
          status: true,
        });
        setMessage("✅ Review approved");
      } else if (action === "delete") {
        await axios.delete(`${BASE_URL}/review/${id}`);
        setMessage("🗑️ Review deleted");
      }
      fetchReviews();
    } catch (err) {
      setMessage("❌ Action failed");
    }
  };

  // Format date nicely
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Reusable Review Card
  const ReviewCard = ({ review, showApprove }) => (
    <div className="p-4 border rounded shadow bg-white flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <img
          src={`${IMAGE_URL}/${review.image}`}
          alt={review.name}
          className="w-16 h-16 rounded-full object-cover border"
        />
        <div>
          <p className="font-bold text-lg">{review.name}</p>
          <p className="text-sm text-gray-600">{review.position}</p>
          <p className="text-sm">⭐ {review.rating}/5</p>
        </div>
      </div>
      <p className="text-gray-800">{review.description}</p>
      <p className="text-xs text-gray-500">{formatDate(review.created_at)}</p>
      <div className="mt-2 flex gap-2">
        {showApprove && (
          <button
            onClick={() => handleAction("approve", review.id)}
            className="bg-green-500 text-white px-3 py-1 rounded"
          >
            Approve
          </button>
        )}
        <button
          onClick={() => handleAction("delete", review.id)}
          className={`${
            showApprove
              ? "bg-yellow-500 text-white"
              : "bg-white border border-gray-400 text-black"
          } px-3 py-1 rounded`}
        >
          {showApprove ? "Decline" : "Delete"}
        </button>
      </div>
    </div>
  );

  const pendingReviews = reviews.filter((r) => !r.status);
  const approvedReviews = reviews.filter((r) => r.status);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Client Reviews</h2>

      {message && (
        <div className="mb-4 p-2 rounded bg-green-100 border border-green-400 text-green-700">
          {message}
        </div>
      )}

      {/* Pending Section */}
      <h3 className="text-xl font-semibold mt-6 mb-2">🕒 Pending Reviews</h3>
      {pendingReviews.length === 0 ? (
        <p className="text-gray-500">No pending reviews.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pendingReviews.map((review) => (
            <ReviewCard key={review.id} review={review} showApprove={true} />
          ))}
        </div>
      )}

      {/* Approved Section */}
      <h3 className="text-xl font-semibold mt-10 mb-2">✅ Approved Reviews</h3>
      {approvedReviews.length === 0 ? (
        <p className="text-gray-500">No approved reviews.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {approvedReviews.map((review) => (
            <ReviewCard key={review.id} review={review} showApprove={false} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageClientReviews;
