import { useState } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Popup from "../components/Popup";

export default function Footer() {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <footer className="bg-[#dff2e1] text-[#145A32] pt-12 pb-6 px-6 md:px-20">
      <div className="grid md:grid-cols-4 gap-10">
        <div>
          <h2 className="text-2xl font-bold mb-3">SR Group</h2>
          <p className="text-sm mb-4">
            Buy, Sell & Rent Properties with Confidence.
          </p>
          <div className="flex gap-3">
            <a href="#" className="hover:scale-110 transition text-[#145A32]">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="hover:scale-110 transition text-[#145A32]">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="hover:scale-110 transition text-[#145A32]">
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Company</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="#" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Services</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <button onClick={() => setPopupOpen(true)}>
                <a href="#" className="hover:underline">
                  Buy Property
                </a>
              </button>
            </li>
            <li>
              <button onClick={() => setPopupOpen(true)}>
                <a href="#" className="hover:underline">
                  Sell Propertyy
                </a>
              </button>
            </li>
            <li>
              <button onClick={() => setPopupOpen(true)}>
                <a href="#" className="hover:underline">
                  Rent Property
                </a>
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Legal</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Terms & Conditions
              </a>
            </li>
          </ul>
          <div className="mt-4">
            <a
              href="#"
              className="inline-block bg-[#145A32] text-white text-sm px-4 py-2 rounded-full hover:bg-[#0e4024] transition"
            >
              Chat With Our Team →
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-[#b2d8bd] pt-4 text-center text-sm text-[#145A32]">
        © {new Date().getFullYear()} SR Group. All rights reserved.
      </div>

      <Popup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />
    </footer>
  );
}
