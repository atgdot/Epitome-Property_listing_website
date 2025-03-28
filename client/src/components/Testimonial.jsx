import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { FaStar } from "react-icons/fa";
import { TestimonialContext } from "../Context/TestimonialContext";

const Testimonial = () => {
  const { testimonials, loading } = useContext(TestimonialContext);

  if (loading) return <div>Loading testimonials...</div>;

  return (
    <div className="w-full py-10 px-5 lg:px-16 bg-white">
      <h2 className="text-center text-2xl uppercase font-semibold text-black mb-8">
        What People Say
      </h2>

      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="w-full px-6"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="border-2 border-[#043268] p-6 rounded-xl shadow-lg bg-white flex flex-col min-h-[400px] hover:shadow-xl transition-shadow duration-300">
              {/* Rating */}
              <div className="flex justify-center mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-xl mx-1 ${
                      i < testimonial.rating ? "text-yellow-400" : "text-gray-200"
                    }`}
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <div className="flex-1 mb-6">
                <p className="text-gray-600 text-center text-sm md:text-base leading-relaxed line-clamp-5">
                  {testimonial.text}
                </p>
              </div>

              {/* User Info */}
              <div className="flex items-center justify-center border-t pt-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#043268]"
                />
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-800">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500">{testimonial.designation}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <div className="swiper-pagination !relative !bottom-0" />
      </div>
    </div>
  );
};

export default Testimonial;