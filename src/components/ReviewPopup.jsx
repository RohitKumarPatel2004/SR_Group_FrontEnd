// components/ReviewPopup.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BASE_URL } from '../baseurl';

export default function ReviewPopup({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    rating: "",
    description: "",
    image: null,
  });

  const [error, setError] = useState("");
  const [imageError, setImageError] = useState(""); // ✅ added image error state
  const [showThankYou, setShowThankYou] = useState(false);

  const MAX_SIZE = 500 * 1024; // 500 KB
  const MIN_SIZE = 10 * 1024;  // 10 KB
  const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png"];

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];
      if (!file) return;

      // ✅ Validate image type
      if (!ALLOWED_TYPES.includes(file.type)) {
        setImageError("❌ Only JPG, JPEG, and PNG files are allowed.");
        return;
      }

      // ✅ Validate image size
      if (file.size > MAX_SIZE) {
        setImageError("❌ Image size must be less than 500KB.");
        return;
      }

      if (file.size < MIN_SIZE) {
        setImageError("❌ Image size must be at least 10KB.");
        return;
      }

      setImageError(""); // ✅ Clear error if valid
      setFormData((prev) => ({ ...prev, image: file }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (imageError) return; // Block submission if image invalid

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));

    try {
      const res = await fetch(`${BASE_URL}/review`, {
        method: "POST",
        body: data,
      });

      const result = await res.json();
      if (!res.ok) {
        setError(result.error || "Something went wrong.");
      } else {
        setFormData({
          name: "",
          position: "",
          rating: "",
          description: "",
          image: null,
        });
        setImageError("");
        onClose();
        setShowThankYou(true);

        setTimeout(() => {
          setShowThankYou(false);
        }, 3000);
      }
    } catch {
      setError("Server error. Try again later.");
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-8 w-full max-w-xl relative shadow-xl"
            >
              <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
              >
                ✕
              </button>

              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-3 justify-center">
                  <div className="relative w-8 h-8">
                    <div className="w-6 h-6 bg-yellow-500 rounded absolute top-1 left-1 z-0"></div>
                    <div className="w-4 h-4 bg-yellow-600 rounded absolute top-0 left-0 z-10 border border-white"></div>
                  </div>
                  <h2 className="text-3xl font-semibold text-[#145A32]">
                    Submit Your Review
                  </h2>
                </div>
                <p className="text-black mt-2">We'd love to hear your feedback!</p>
                <div className="w-24 h-1 bg-yellow-500 mx-auto mt-3 rounded"></div>
              </div>

              {error && <p className="text-red-600 mb-2">{error}</p>}

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  name="name"
                  type="text"
                  placeholder="Name *"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2"
                />
                <input
                  name="position"
                  type="text"
                  placeholder="Position (e.g. CEO, Client) *"
                  required
                  value={formData.position}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2"
                />
                <input
                  name="rating"
                  type="number"
                  step="0.1"
                  max="5"
                  min="1"
                  placeholder="Rating (1 to 5) *"
                  required
                  value={formData.rating}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2"
                />
                <textarea
                  name="description"
                  placeholder="Your feedback *"
                  required
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 resize-none h-24"
                />

                <div>
                  <input
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full"
                  />
                  {imageError && (
                    <p className="text-red-600 text-sm mt-1">{imageError}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="bg-[#145A32] text-white py-2 w-full rounded-lg hover:bg-[#0e4024]"
                >
                  Submit Review
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Thank You Popup */}
      <AnimatePresence>
        {showThankYou && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white text-center px-8 py-6 rounded-xl shadow-lg max-w-sm w-full"
            >
              <h3 className="text-2xl font-semibold text-green-700 mb-2">
                🎉 Thank You!
              </h3>
              <p className="text-gray-700">
                Thanks for submitting your review about our company!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
