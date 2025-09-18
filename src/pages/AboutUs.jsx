import React from "react";
import owner from "../assets/ownerphoto.jpg";
import farmland from "../assets/aboutbanner.jpg"; 
import { Helmet } from "react-helmet-async";

export default function AboutUs() {
  return (
    <div className="bg-white text-gray-800">
       {/* 🔹 SEO Meta Tags */}
      <Helmet>
        <title>About Us | SR Group</title>
        <meta 
          name="description" 
          content="Learn more about SR Group, a leading real estate company founded by Mr. Rajesh Gautam. Discover our vision, mission, services, and achievements in building trust and delivering premium properties." 
        />
        <meta 
          name="keywords" 
          content="SR Group, About SR Group, Rajesh Gautam, real estate company, property dealer, Noida, residential plots, commercial spaces, rental properties" 
        />

        {/* Open Graph (Facebook, LinkedIn, WhatsApp previews) */}
        <meta property="og:title" content="About Us | SR Group" />
        <meta property="og:description" content="SR Group is a trusted name in real estate founded by Rajesh Gautam. Explore our vision, mission, services, and achievements." />
        <link rel="canonical" href="https://thesrgroupofficial.in/about-us" />
        <meta property="og:url" content="https://thesrgroupofficial.in/about-us" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://thesrgroupofficial.in/SR_logo.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us | SR Group" />
        <meta name="twitter:description" content="Discover SR Group, a trusted real estate company led by Rajesh Gautam. Learn about our services and achievements." />
        <meta name="twitter:image" content="https://thesrgroupofficial.in/SR_logo.png" />
      </Helmet>
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center text-white py-28 px-8 md:px-20"
        style={{ backgroundImage: `url(${farmland})` }}
      >
        {/* Green Overlay */}
        <div className="absolute inset-0 bg-green-900 bg-opacity-70"></div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl">
          {/* <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Agricultural Farmland for Sale in Noida
          </h1> */}
          <p className="text-lg md:text-xl mb-6 leading-relaxed">
            SR Group is a leading real estate company founded by{" "}
          <strong>Mr. Rajesh Gautam</strong>. We specialize in delivering
          high-quality real estate solutions, including residential plots,
          apartments, commercial spaces, and rental properties. With years of
          experience and a commitment to excellence, we are helping thousands of
          families and investors achieve their real estate goals.
          </p>
          <button className="bg-white text-green-700 font-semibold px-6 py-3 rounded-xl shadow hover:bg-green-100 transition">
            About Us →
          </button>
        </div>
      </section>

      {/* Owner Info */}
      {/* Owner Info */}
<section className="py-20 px-8 bg-white">
  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
    
    {/* Left: Owner Image */}
    <div className="flex justify-center">
      <div className="relative">
        <img
          src={owner}
          alt="Owner - Rajesh Gautam"
          className="w-72 h-72 object-cover rounded-2xl shadow-lg border-4 border-green-600"
        />
        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-white text-lg font-bold">SR</span>
        </div>
      </div>
    </div>

    {/* Right: Owner Details */}
    <div>
      <h2 className="text-4xl font-bold text-green-700 mb-4">
        Meet Our Founder
      </h2>
      <p className="text-lg text-gray-700 mb-6 leading-relaxed">
        <strong>Rajesh Gautam</strong>, the visionary behind SR Group,
        founded the company with a mission to build trust, transparency,
        and long-term value in the real estate market. His leadership has
        established SR Group as one of the most reliable names in the
        industry.
      </p>

      <div className="space-y-2">
        <p className="text-gray-800 text-lg">
          📧 <strong>Email:</strong> rajeshgautam303@gmail.com
        </p>
        <p className="text-gray-800 text-lg">
          📞 <strong>Phone:</strong> +91 96675 46390
        </p>
      </div>

      <a href="tel:+919667546390">
  <button className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition">
    Contact Founder →
  </button>
</a>

    </div>
  </div>
</section>

      {/* Vision & Mission */}
      <section className="bg-yellow-100 py-16 px-8 grid md:grid-cols-2 gap-8 text-center">
        <div className="p-6 bg-white rounded-2xl shadow-md">
          <h3 className="text-2xl font-semibold text-green-700 mb-3">
            Our Vision
          </h3>
          <p>
            To be recognized as a trusted leader in real estate by delivering
            value-driven projects, empowering customers with secure investments,
            and creating modern living spaces that inspire progress and comfort.
          </p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-md">
          <h3 className="text-2xl font-semibold text-green-700 mb-3">
            Our Mission
          </h3>
          <p>
            To provide hassle-free property buying, selling, and rental
            solutions that cater to the needs of families, professionals, and
            investors. We aim to redefine urban living and investment
            opportunities with transparency and innovation.
          </p>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-16 px-8 text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-10">
          What We Offer
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-green-50 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold mb-3">Residential Plots</h3>
            <p>
              Invest in premium plots in prime locations with complete legal
              documentation and transparency. Perfect for building your dream
              home.
            </p>
          </div>
          <div className="p-6 bg-green-50 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold mb-3">Apartments</h3>
            <p>
              Explore modern apartments designed for comfort, security, and
              luxury. Available in various budgets to suit your lifestyle.
            </p>
          </div>
          <div className="p-6 bg-green-50 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold mb-3">Property on Rent</h3>
            <p>
              We provide rental solutions for families, students, and working
              professionals across multiple cities with affordable pricing.
            </p>
          </div>
          <div className="p-6 bg-green-50 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold mb-3">Commercial Spaces</h3>
            <p>
              From offices to retail shops, we offer commercial properties that
              help businesses grow in high-demand areas.
            </p>
          </div>
          <div className="p-6 bg-green-50 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold mb-3">Investment Guidance</h3>
            <p>
              Our expert team guides you to make the right investment decisions
              in real estate for maximum returns and security.
            </p>
          </div>
          <div className="p-6 bg-green-50 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold mb-3">Legal Support</h3>
            <p>
              Complete assistance in property verification, documentation, and
              legal processes to ensure safe and smooth transactions.
            </p>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 px-8 text-center bg-gray-50">
        <h2 className="text-3xl font-bold text-green-700 mb-10">
          Our Achievements
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded-2xl shadow">
            <h3 className="text-3xl font-bold text-green-700">15+</h3>
            <p>Years of Experience</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow">
            <h3 className="text-3xl font-bold text-green-700">1500+</h3>
            <p>Properties Delivered</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow">
            <h3 className="text-3xl font-bold text-green-700">1500+</h3>
            <p>Satisfied Clients</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow">
            <h3 className="text-3xl font-bold text-green-700">8+</h3>
            <p>Ongoing Projects</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-8">
        <h2 className="text-3xl font-bold text-green-700 text-center mb-10">
          Why Choose SR Group?
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 bg-yellow-50 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-3">Transparency</h3>
            <p>
              We believe in complete honesty and transparency in all our
              property dealings, ensuring you get what you are promised.
            </p>
          </div>
          <div className="p-6 bg-yellow-50 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-3">Customer First</h3>
            <p>
              Your satisfaction is our priority. We go the extra mile to
              understand your needs and deliver the best property solutions.
            </p>
          </div>
          <div className="p-6 bg-yellow-50 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-3">Prime Locations</h3>
            <p>
              All our projects are strategically located to provide excellent
              connectivity, convenience, and future growth potential.
            </p>
          </div>
          <div className="p-6 bg-yellow-50 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-3">Expert Guidance</h3>
            <p>
              Our experienced professionals guide you through every step of your
              property journey, from selection to registration.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
