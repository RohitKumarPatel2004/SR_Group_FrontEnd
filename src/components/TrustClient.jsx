import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // ✅ use navigate like in BlogList

import mem1 from "../assets/mem1.png";
import mem2 from "../assets/mem2.png";
import mem3 from "../assets/mem3.png";
import mem4 from "../assets/mem4.png";
import Trust from "../assets/Trust.png";
import LoadingButton from "../components/LoadingButton";

const memberImages = [mem1, mem2, mem3, mem4];

const reviews = [
  {
    image: mem1,
    rating: 4.8,
    message:
      "SR Group helped me find my dream home in just 3 days. Excellent service!",
  },
  {
    image: mem2,
    rating: 4.6,
    message:
      "I sold my apartment with SR Group – smooth and transparent experience.",
  },
  {
    image: mem3,
    rating: 4.9,
    message: "Rented my 2BHK through SR Group. Very professional team!",
  },
  {
    image: mem4,
    rating: 4.7,
    message: "Great experience buying a plot through SR Group. Hassle-free process.",
  },
];

export default function TrustClient() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [buttonLoading, setButtonLoading] = useState(false); // ✅ same as BlogList
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentIndex((prev) => (prev + 1) % reviews.length),
      3000
    );
    return () => clearInterval(interval);
  }, []);

  const handleContactClick = () => {
    setButtonLoading(true);
    setTimeout(() => {
      navigate("/contact-us"); // ✅ smooth navigation like BlogList
    }, 800);
  };

  return (
    <section className="py-12 px-6 md:px-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 bg-[#dff2e1] text-[#145A32] px-4 py-1 rounded-full w-fit text-sm font-medium mb-4">
            <FaCheckCircle />
            Trusted by our clients
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-[#145A32] mb-4">
            Real Estate Made Simple
          </h2>

          <p className="text-[#222] text-lg leading-relaxed mb-6">
            Welcome to <strong>SR Group</strong> — your trusted partner for buying,
            selling, and renting properties. From apartments to plots, we simplify
            your real estate journey with expert support.
          </p>

          {/* ✅ Contact Button with spinner */}
          <LoadingButton
            isLoading={buttonLoading}
            onClick={handleContactClick}
            className="bg-[#145A32] text-white text-lg font-semibold px-6 py-3 rounded-xl hover:bg-[#0e4024] transition"
          >
            Contact Us →
          </LoadingButton>

          {/* MEMBERS BLOCK */}
          <div className="mt-8 bg-white shadow-md p-4 rounded-xl flex items-center space-x-4 max-w-md">
            <div className="flex -space-x-2">
              {memberImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Client ${i + 1}`}
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
              ))}
            </div>
            <div>
              <h4 className="font-semibold text-[#145A32]">100k+ Clients</h4>
              <p className="text-sm text-gray-600">across India & overseas</p>
            </div>
          </div>

          {/* REVIEW SLIDER */}
          <div className="mt-6">
            <h3 className="text-[#145A32] font-semibold mb-3">
              What Our Clients Say
            </h3>
            <ReviewCard {...reviews[currentIndex]} />
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <img src={Trust} alt="Real Estate Client" className="w-full max-w-md mx-auto" />
        </motion.div>
      </div>
    </section>
  );
}

function ReviewCard({ image, rating, message }) {
  return (
    <motion.div
      key={message}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-xl shadow-md p-4 flex items-start space-x-3 max-w-xl"
    >
      <div className="relative">
        <img src={image} alt="Reviewer" className="w-10 h-10 rounded-full" />
        <div className="absolute -top-2 -right-2 bg-yellow-400 text-white text-xs px-1.5 py-0.5 rounded-full">
          {rating}
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-800">{message}</p>
      </div>
    </motion.div>
  );
}
