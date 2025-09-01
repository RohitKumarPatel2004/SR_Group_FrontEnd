import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import Popup from "../components/Popup";
import { BASE_URL, IMAGE_URL } from "../baseurl";

export default function Property() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [shownPrices, setShownPrices] = useState([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(`${BASE_URL}/property/all`);
        const data = await res.json();
        setProperties(data);
      } catch (err) {
        console.error("Error fetching properties:", err);
      }
    };

    fetchProperties();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }),
  };

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

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <section className="w-full py-16 px-4 bg-[#f9f9f9]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#145A32] mb-2">
            Land Properties for Sale
          </h1>
          <p className="text-gray-700">
            Explore our land listings with all essential amenities
          </p>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mt-3 rounded"></div>
        </div>

        {/* Property Grid */}
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
              {/* Image Section */}
              <div className="relative overflow-hidden group">
                <img
                  src={
                    property.image
                      ? `${IMAGE_URL}/${property.image}`
                      : "/placeholder.jpg"
                  }
                  alt={property.title}
                  loading="lazy"
                  className="w-full h-56 object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
                <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                  For Sale
                </span>
              </div>

              {/* Details Section */}
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-lg text-[#145A32]">
                  {property.title}
                </h3>
                <p className="text-sm text-gray-600">📍 {property.location}</p>

                <div className="text-sm text-gray-700 space-y-1">
                  <p>📐 Area: {property.area} sqft</p>
                  <p>🛣️ Main Road: {property.roadDistance}</p>
                  <p>🚇 Metro Line: {property.metroDistance}</p>
                  <p>
                    ⚡ Bijali: {property.bijali ? "Yes" : "No"} | 🚿 Pani:{" "}
                    {property.pani ? "Yes" : "No"} | 🕳️ Sivar Line:{" "}
                    {property.sivar ? "Yes" : "No"}
                  </p>
                  <p>🏫 Nearby School: {property.nearSchool}</p>
                  <p>🏙️ Developed Area: {property.developed ? "Yes" : "No"}</p>
                </div>

                <p className="text-gray-600 text-sm mt-2">
                  📝 {property.description}
                </p>

                {/* Price & Actions */}
                <div className="mt-4 flex items-center justify-between">
                  {shownPrices.includes(property.id) ||
                  selectedPropertyId === property.id ? (
                    <span className="text-[#145A32] font-bold">
                      {formatPrice(property.price)}
                    </span>
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
                      href={`https://wa.me/917000000000?text=Hi, I am interested in ${property.title}`}
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

        {/* Price Request Popup */}
        <Popup isOpen={popupOpen} onClose={handleClosePopup} />
      </div>
    </section>
  );
}
