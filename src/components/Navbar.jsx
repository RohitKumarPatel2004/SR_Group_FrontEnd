import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
import ReviewPopup from "./ReviewPopup";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [reviewPopupOpen, setReviewPopupOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-white px-6 py-4 shadow flex items-center justify-between z-50">
        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <img
            src={logo}
            alt="Logo"
            className="h-10 sm:h-12 md:h-12 sm:pl-4 md:pl-8 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-1"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-black font-medium">
          {[
            { name: "Home", path: "/" },
            { name: "Blogs", path: "/blogs" },
            { name: "Properties", path: "/property" },
            { name: "About", path: "/about-us" },
            { name: "Admin Dashboard", path: "/admin" },
          ].map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `relative group transition font-medium ${
                    isActive ? "text-green-600" : "text-black hover:text-green-600"
                  }`
                }
              >
                {item.name}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-500 transition-all duration-300 group-hover:w-full"></span>
              </NavLink>
            </li>
          ))}
          <li>
            <span
              onClick={() => setReviewPopupOpen(true)}
              className="relative group cursor-pointer text-black hover:text-green-600 transition"
            >
              Submit Review
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-500 transition-all duration-300 group-hover:w-full"></span>
            </span>
          </li>
        </ul>

        {/* Desktop Contact Button */}
        <div className="hidden md:flex">
          <Link
            to="/contact-us"
            className="bg-black text-white px-5 py-2 rounded-full flex items-center gap-2 hover:bg-gray-900 transition"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Contact Us Now
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 py-6 z-50 md:hidden">
            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `transition-colors duration-300 ${
                  isActive ? "text-green-600" : "text-gray-700 hover:text-green-600"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/blogs"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `transition-colors duration-300 ${
                  isActive ? "text-green-600" : "text-gray-700 hover:text-green-600"
                }`
              }
            >
              Blogs
            </NavLink>
            <NavLink
              to="/property"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `transition-colors duration-300 ${
                  isActive ? "text-green-600" : "text-gray-700 hover:text-green-600"
                }`
              }
            >
              Properties
            </NavLink>
            <NavLink
              to="/about-us"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `transition-colors duration-300 ${
                  isActive ? "text-green-600" : "text-gray-700 hover:text-green-600"
                }`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/admin"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `transition-colors duration-300 ${
                  isActive ? "text-green-600" : "text-gray-700 hover:text-green-600"
                }`
              }
            >
              Admin Dashboard
            </NavLink>
            <button
              onClick={() => {
                setReviewPopupOpen(true);
                setMenuOpen(false);
              }}
              className="text-black hover:text-green-600 transition-colors duration-300"
            >
              Submit Review
            </button>
            <Link
              to="/contact-us"
              onClick={() => setMenuOpen(false)}
              className="bg-black text-white px-5 py-2 rounded-full flex items-center gap-2 hover:bg-gray-900 transition"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Contact Us Now
              <ArrowUpRight size={16} />
            </Link>
          </div>
        )}
      </nav>

      {/* Review Popup */}
      <ReviewPopup
        isOpen={reviewPopupOpen}
        onClose={() => setReviewPopupOpen(false)}
      />
    </>
  );
}
