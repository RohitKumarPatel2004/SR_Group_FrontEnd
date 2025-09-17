import { motion } from "framer-motion";
import {
  FaKey,
  FaChartLine,
  FaBalanceScale,
  FaTools,
  FaHandshake,
  FaBuilding,
} from "react-icons/fa";

const services = [
  {
    icon: <FaBuilding size={24} />,
    title: "Property Sales",
    description:
      "Expertly promoting and selling your property to attract qualified buyers.",
  },
  {
    icon: <FaHandshake size={24} />,
    title: "Buyer Representation",
    description:
      "Guiding you through the home-buying process, prioritizing your interests.",
  },
  {
    icon: <FaKey size={24} />,
    title: "Rental Management",
    description:
      "Managing tenant relations, maintenance, and finances to maximize rental returns.",
  },
  {
    icon: <FaChartLine size={24} />,
    title: "Investment Consulting",
    description:
      "Providing strategic advice to help you capitalize on real estate opportunities.",
  },
  {
    icon: <FaBalanceScale size={24} />,
    title: "Property Valuation",
    description:
      "Accurately assessing your property’s value for sales, purchases, or investments.",
  },
  {
    icon: <FaTools size={24} />,
    title: "Tailored Solutions",
    description:
      "Delivering customized real estate services aligned with your specific goals.",
  },
];

export default function ChooseUs() {
  return (
    <section className="px-6 py-16 bg-[#F5F5DC] text-[#145A32]">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold"
        >
          Why Choose Us
        </motion.h2>
        <p className="text-gray-700 mt-2 text-lg">
          Explore Our Range of Expert Real Estate Services
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white text-[#145A32] rounded-xl p-6 shadow hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center mb-4">
              <div className="bg-[#F5F5DC] p-3 rounded-full text-xl text-[#145A32]">
                {service.icon}
              </div>
              <h3 className="ml-4 text-xl font-semibold">{service.title}</h3>
            </div>
            <p className="text-gray-600 text-sm">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
