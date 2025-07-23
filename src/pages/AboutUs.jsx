import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white text-gray-800 p-8 md:p-16">
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-green-600 mb-6 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        About Us
      </motion.h1>

      <motion.div
        className="bg-green-100 rounded-2xl shadow-xl p-6 md:p-10 mb-10 hover:bg-green-200 transition-all duration-300"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold text-green-700 mb-4">
          Our Company
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          We are a trusted name in the real estate industry, providing
          professional services for buying, selling, and renting properties.
          With years of experience, our mission is to connect people with their
          dream homes and investment opportunities. Our team works with
          integrity, transparency, and innovation.
        </p>
      </motion.div>

      <motion.div
        className="bg-yellow-100 rounded-2xl shadow-xl p-6 md:p-10 hover:bg-yellow-200 transition-all duration-300"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold text-yellow-700 mb-4">
          Our Founder
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Mr. Rohit Kumar, our visionary founder, started this company with the
          belief that every customer deserves personal attention and honest
          advice. His leadership and dedication have been the cornerstone of our
          success. With a deep knowledge of real estate trends and a passion for
          helping people, he ensures each client feels valued and confident.
        </p>
      </motion.div>
    </div>
  );
}
