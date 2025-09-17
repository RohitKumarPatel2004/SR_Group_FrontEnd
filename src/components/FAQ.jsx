import { useState, useEffect } from "react";
import axios from "axios";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { BASE_URL } from "../baseurl";

export default function FAQ() {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/faq/all`)
      .then((res) => setFaqs(res.data))
      .catch((err) => {
        console.error("Error fetching FAQs:", err);
      });
  }, []);

  const toggle = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <section className="bg-white py-16 px-6 md:px-24">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-[#145A32]">
          Frequently Asked Questions (FAQs)
        </h2>
        <p className="text-gray-600 mt-2">
          Quick answers to your real estate queries
        </p>
        <div className="h-1 w-20 bg-[#145A32] mx-auto mt-3 rounded-full"></div>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={faq.id || index}
            className="bg-[#f9f9f9] rounded-xl p-5 border border-[#ddd] shadow-sm transition hover:shadow-md"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggle(index)}
            >
              <div className="flex items-center gap-3">
                <div className="bg-[#145A32] text-white p-2 rounded-full">
                  <MdOutlineQuestionAnswer size={20} />
                </div>
                <h3 className="text-[#145A32] font-medium text-base md:text-lg">
                  {faq.question}
                </h3>
              </div>
              <div className="text-[#145A32]">
                {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </div>
            </div>

            {openIndex === index && (
              <p className="mt-3 text-gray-700 text-sm md:text-base leading-relaxed">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
