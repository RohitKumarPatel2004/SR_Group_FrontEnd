import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { BASE_URL } from '../baseurl';


export default function ClientReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/review/all`)
      .then((res) => res.json())
      .then((data) => {
        const approved = data.filter((review) => review.status === 1);
        setReviews(approved);
      })
      .catch((err) => console.error("Error fetching reviews:", err));
  }, []);

  return (
    <section className="py-16 px-4 md:px-10">
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <section className="py-5 text-center">
          <div className="flex justify-center items-center mb-4">
            <div className="relative inline-block">
              <div className="w-10 h-10 bg-[#145A32] rounded-md"></div>
              <div className="w-5 h-5 bg-[#145A32] rounded-md absolute -top-2 -right-2"></div>
            </div>
            <h2 className="text-4xl font-semibold text-[#145A32] ml-4">Clients Testimonials</h2>
          </div>
          <p className="text-lg text-black font-medium mb-3">
            How Our Real Estate Agents Deliver Excellence!
          </p>
          <div className="w-[200px] h-[2px] bg-[#145A32] mx-auto"></div>
        </section>
      </div>

      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        spaceBetween={20}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          768: { slidesPerView: 2 },
        }}
        loop={reviews.length > 2}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm h-full">
              <div className="text-yellow-500 text-lg mb-2">
                {"★".repeat(review.rating).padEnd(5, "☆")}
              </div>
              <p className="text-gray-800 mb-6">{review.description}</p>
              <div className="flex items-center gap-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-[#145A32]">{review.name}</p>
                  <p className="text-sm text-gray-500">{review.position}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
