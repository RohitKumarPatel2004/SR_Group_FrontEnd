import { motion } from "framer-motion";
import { BASE_URL } from '../baseurl';
import LoadingButton from '../components/LoadingButton'; 

import { useState } from "react";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [gmail, setGmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true); // ✅ Start loading
 
    if (error) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/support`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, gmail, phone, message }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        setSuccess("Support request submitted successfully!");
        setName("");
        setGmail("");
        setPhone("");
        setMessage("");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
    finally {
      setLoading(false); // ✅ Stop loading
    }
  };

  return (
    <section className="bg-white">
      {/* HEADER */}
      <div className="bg-[#145A32] text-white text-center py-12">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="mt-2 text-lg">We’re here to help you find your dream property</p>
      </div>

      {/* QUOTE + FORM */}
      <div className="py-16 px-4 md:px-24 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="md:w-1/2 text-center md:text-left"
        >
          <blockquote className="text-[#145A32] text-3xl md:text-4xl font-bold leading-snug">
            “The right time to buy property<br className="hidden md:block" /> is always now.”
          </blockquote>
          <p className="mt-4 text-lg text-[#145A32] font-medium">— SR Group</p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#dff2e1] p-8 rounded-2xl shadow-lg w-full md:w-1/2"
        >
          <div className="text-center mb-10">
            <div className="flex justify-center items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-[#145A32] relative">
                <div className="w-2 h-2 bg-[#145A32] rounded absolute top-[-5px] left-[10px]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#145A32]">
                Let's Talk Property
              </h2>
            </div>

            <p className="text-black text-lg mt-2">
              Connect with SR Group – Your Trusted Real Estate Partner!
            </p>

            <div className="w-32 h-1 mt-3 bg-[#145A32] mx-auto"></div>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {success && <p className="text-green-600 text-sm mb-4">{success}</p>}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-[#145A32]">Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:border-[#145A32]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#145A32]">Phone Number *</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:border-[#145A32]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#145A32]">Gmail *</label>
              <input
                type="email"
                value={gmail}
                onChange={(e) => setGmail(e.target.value)}
                placeholder="Enter your Gmail"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:border-[#145A32]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#145A32]">Message *</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us what you’re looking for..."
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-xl h-28 resize-none focus:outline-none focus:border-[#145A32]"
                required
              ></textarea>
            </div>
 <LoadingButton
                  type="submit"
                  isLoading={loading}
                  className="bg-[#145A32] text-white py-2 w-full rounded-lg hover:bg-[#0e4024]"
                >
                  Submit Review
                </LoadingButton>
          </form>
        </motion.div>
      </div>

      {/* CONTACT DETAILS */}
      <div className="bg-[#f9f9f9] py-12 px-4 md:px-24 text-center md:text-left">
        <h3 className="text-2xl font-bold text-[#145A32] mb-6">Contact Details</h3>
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <h4 className="font-semibold text-[#145A32] mb-2">📞 Phone</h4>
            <p>+91 9667546390</p>
          </div>
          <div>
            <h4 className="font-semibold text-[#145A32] mb-2">📧 Email</h4>
            <p>contact@srgroup.com</p>
          </div>
          <div>
            <h4 className="font-semibold text-[#145A32] mb-2">🏢 Head Office</h4>
            <p>Noida Sector 49, Uttar Pradesh</p>
          </div>
        </div>
      </div>

      {/* GOOGLE MAPS LOCATIONS */}
      <div className="px-4 md:px-24 py-16 space-y-12">
        <div>
          <h4 className="text-xl font-semibold text-[#145A32] mb-4">📍 Noida Sector 49 Office</h4>
          <iframe
            title="Noida Office"
            src="https://www.google.com/maps?q=Noida+Sector+49,+UP&output=embed"
            width="100%"
            height="300"
            allowFullScreen=""
            loading="lazy"
            className="rounded-lg shadow"
          ></iframe>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-[#145A32] mb-4">📍 Saini Sonpura Office</h4>
          <iframe
            title="Saini Sonpura Office"
            src="https://www.google.com/maps?q=Saini+Sonpura,+UP&output=embed"
            width="100%"
            height="300"
            allowFullScreen=""
            loading="lazy"
            className="rounded-lg shadow"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
