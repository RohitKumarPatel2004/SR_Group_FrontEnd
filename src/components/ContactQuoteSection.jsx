import { motion } from "framer-motion";
import { useState } from "react";
import { BASE_URL } from '../baseurl';


export default function ContactQuoteSection() {
  const [name, setName] = useState("");
  const [gmail, setGmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`${BASE_URL}/support`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, gmail, message, phone }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        setSuccess("Message sent successfully!");
        setName("");
        setGmail("");
        setPhone("");
        setMessage("");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <section className="bg-[#dff2e1] py-16 px-4 md:px-24 flex flex-col md:flex-row items-center justify-between gap-10">
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

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white p-8 rounded-2xl shadow-lg w-full md:w-1/2"
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

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-3">{success}</p>}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-[#145A32]">Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:border-[#145A32]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#145A32]">Phone Number *</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:border-[#145A32]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#145A32]">Gmail *</label>
            <input
              type="email"
              required
              value={gmail}
              onChange={(e) => setGmail(e.target.value)}
              placeholder="Enter your Gmail"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:border-[#145A32]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#145A32]">Message *</label>
            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what you’re looking for..."
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-xl h-28 resize-none focus:outline-none focus:border-[#145A32]"
            ></textarea>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-[#145A32] text-white py-3 rounded-full font-semibold text-lg shadow-md hover:bg-[#0e4024] transition"
          >
            Submit
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
}
