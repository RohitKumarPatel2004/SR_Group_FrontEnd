import { useState } from "react";
import { BASE_URL } from "../baseurl";
import LoadingButton from "../components/LoadingButton";

export default function Popup({ isOpen, onClose }) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gmail, setGmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/support`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, gmail, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        setName("");
        setPhone("");
        setGmail("");
        setMessage("");
        setFormSubmitted(true);
      }
    } catch (err) {
      setError("Failed to connect to server");
    }

    setIsLoading(false);
  };

  const handleClose = () => {
    setFormSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] max-w-md relative">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
        >
          &times;
        </button>

        {formSubmitted ? (
          <div className="text-center">
            <div className="text-green-600 text-3xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-[#145A32] mb-2">
              Thanks for submitting your review
            </h2>
            <p className="text-gray-700">
              We appreciate your feedback and will get back to you soon!
            </p>
            <button
              className="mt-6 bg-[#145A32] text-white px-5 py-2 rounded hover:bg-[#0e4024]"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-3 justify-center">
                <div className="relative w-8 h-8">
                  <div className="w-6 h-6 bg-yellow-500 rounded absolute top-1 left-1 z-0"></div>
                  <div className="w-4 h-4 bg-yellow-600 rounded absolute top-0 left-0 z-10 border border-white"></div>
                </div>
                <h2 className="text-3xl font-semibold text-[#145A32]">
                  Client Support
                </h2>
              </div>
              <p className="text-black mt-2">
                Our team is ready to support you. Please fill out the form
                below, and we’ll get back to you shortly.
              </p>
              <div className="w-24 h-1 bg-yellow-500 mx-auto mt-3 rounded"></div>
            </div>

            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-[#145A32]">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:border-[#145A32]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#145A32]">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:border-[#145A32]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#145A32]">
                  Gmail *
                </label>
                <input
                  type="email"
                  required
                  value={gmail}
                  onChange={(e) => setGmail(e.target.value)}
                  placeholder="Enter your Gmail"
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:border-[#145A32]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#145A32]">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us how we can help you..."
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded h-24 resize-none focus:outline-none focus:border-[#145A32]"
                />
              </div>

              <LoadingButton
                isLoading={isLoading}
                type="submit"
                className="w-full bg-[#145A32] text-white py-2 rounded hover:bg-[#0e4024] transition font-semibold"
              >
                Submit Review
              </LoadingButton>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
