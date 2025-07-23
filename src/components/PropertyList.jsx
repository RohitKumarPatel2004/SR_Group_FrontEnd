import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Popup from "../components/Popup";
import { BASE_URL, IMAGE_URL } from '../baseurl';


export default function PropertyList() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [shownPrices, setShownPrices] = useState([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [properties, setProperties] = useState([]);

  // Fetch recent 3 properties from backend
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(`${BASE_URL}/property/all`);
        const data = await res.json();

        // Sort by created_at descending and take only top 3
        const sorted = data
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 3);

        setProperties(sorted);
      } catch (err) {
        console.error("Error fetching properties:", err);
      }
    };

    fetchProperties();
  }, []);

  const handleOpenPopup = (propertyId) => {
    setSelectedPropertyId(propertyId);
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    if (!shownPrices.includes(selectedPropertyId)) {
      setShownPrices((prev) => [...prev, selectedPropertyId]);
    }
    setPopupOpen(false);
    setSelectedPropertyId(null);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2 },
    }),
  };

  return (
    <section className="w-full py-16 px-4 bg-[#f9f9f9]">
      <div className="max-w-[100%] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 justify-center">
            <div className="relative w-8 h-8">
              <div className="w-6 h-6 bg-yellow-500 rounded absolute top-1 left-1 z-0"></div>
              <div className="w-4 h-4 bg-yellow-600 rounded absolute top-0 left-0 z-10 border border-white"></div>
            </div>
            <h2 className="text-3xl font-semibold text-[#145A32]">Featured Properties</h2>
          </div>
          <p className="text-black mt-2">Find Your Perfect Home with a Trusted Real Estate Agent</p>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mt-3 rounded"></div>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1 hover:scale-105 duration-300"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
            >
              <div className="relative overflow-hidden group">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-56 object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
                <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                  For Sale
                </span>
              </div>

              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-lg text-[#145A32]">{property.title}</h3>
                <p className="text-sm text-gray-600">📍 {property.location}</p>

                <div className="text-sm text-gray-700 space-y-1">
                  <p>📐 Area: {property.area} sqft</p>
                  <p>🛣️ Main Road: {property.roadDistance}</p>
                  <p>🚇 Metro: {property.metroDistance}</p>
                  <p>
                    ⚡ Bijali: {property.bijali ? "Yes" : "No"} | 🚿 Pani:{" "}
                    {property.pani ? "Yes" : "No"} | 🕳️ Sivar:{" "}
                    {property.sivar ? "Yes" : "No"}
                  </p>
                  <p>🏫 School: {property.nearSchool}</p>
                  <p>🏙️ Developed: {property.developed ? "Yes" : "No"}</p>
                  <p className="text-gray-600 text-sm mt-2">📝 {property.description}</p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  {shownPrices.includes(property.id) || selectedPropertyId === property.id ? (
                    <span className="text-[#145A32] font-bold">{property.price}</span>
                  ) : (
                    <button
                      onClick={() => handleOpenPopup(property.id)}
                      className="text-[#145A32] font-semibold hover:underline"
                    >
                      Price Upon Request
                    </button>
                  )}

                  <div className="flex gap-2">
                    <a
                      href="https://wa.me/917000000000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full shadow-sm hover:shadow-lg transition"
                      title="Chat on WhatsApp"
                    >
                      <FaWhatsapp size={16} />
                    </a>
                    <a
                      href="tel:+917000000000"
                      className="bg-[#145A32] hover:bg-green-800 text-white p-2 rounded-full shadow-sm hover:shadow-lg transition"
                      title="Call Us"
                    >
                      <FaPhoneAlt size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <Link to="/property">
            <button className="bg-[#145A32] text-white px-6 py-3 rounded hover:bg-green-800 transition">
              View All Listings
            </button>
          </Link>
        </div>

        {/* Price Reveal Popup */}
        <Popup isOpen={popupOpen} onClose={handleClosePopup} />
      </div>
    </section>
  );
}
