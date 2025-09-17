import React from "react";
import advertise from "../assets/advertise.png";
import forrent from "../assets/forrent.png";
import forsale from "../assets/forsale.png";
import { useState } from "react";
import Popup from "./Popup";

const features = [
  {
    title: "Buy",
    image: forsale,
    description:
      "With over 100K+ new and resale properties across India, let us help you get you the right property at the right price.",
    buttonText: "Properties for sale",
  },
  {
    title: "Rent",
    image: forrent,
    description:
      "We can help you easily find a home or office for rent that you'll love from our large database of broker and owner listings.",
    buttonText: "Properties for rent",
  },
  {
    title: "Advertise",
    image: advertise,
    description:
      "Advertise your property on our platform and rent or sell it in no time. Advertising is fast and free!",
    buttonText: "Advertise property",
  },
];

export default function FeatureSR() {
  const [popupOpen, setPopupOpen] = useState(false);
  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-[#145A32] mb-4">Our Services</h2>
        <p className="text-lg text-gray-700 mb-10">
          Explore our offerings tailored to meet your real estate needs
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#F5F5DC] rounded-lg p-6 shadow-lg hover:shadow-xl transition duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="mx-auto h-40 object-contain mb-4"
              />
              <h3 className="text-xl font-semibold text-[#145A32] mb-2">
                {item.title}
              </h3>
              <p className="text-gray-800 mb-4">{item.description}</p>
              <button
                onClick={() => setPopupOpen(true)}
                className="mt-2 bg-[#145A32] text-white px-4 py-2 rounded hover:bg-green-800"
              >
                {item.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
      <Popup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />
    </section>
  );
}
