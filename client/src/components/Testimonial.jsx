import React, { useContext } from "react";
import { FaStar } from "react-icons/fa";
import { TestimonialContext } from "../Context/TestimonialContext";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Testimonial = () => {
  const { testimonials, loading } = useContext(TestimonialContext);

  // Handle image errors
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNjY2MiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5OTkiPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==";
    e.target.style.objectFit = "contain";
  };

  if (loading) return <div className="w-full py-10 text-center">Loading testimonials...</div>;

  if (!testimonials || testimonials.length === 0) {
    return <section className="my-4 py-8 text-center text-gray-500">No testimonials available.</section>;
  }

  return (
    <div className="w-full py-10 px-5 lg:px-16 bg-white">
      <h2 className="text-center text-2xl uppercase font-semibold text-black mb-8">
        What People Say
      </h2>

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
        className="testimonial-swiper"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="w-[250px] border-2 border-gray-200 p-4 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] bg-white flex flex-col min-h-[250px] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all duration-300">
              {/* User Info */}
              <div className="flex flex-col items-center pt-2">
                <img
                  src={testimonial.profile_photo}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full object-cover mb-3"
                  onError={handleImageError}
                  loading="lazy"
                />
                <div className="text-center">
                  <h4 className="text-xl font-bold text-gray-800 mb-1">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500">{testimonial.Designation}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex justify-center my-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-lg mx-1 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-200"
                      }`}
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <div className="flex-1 mb-4">
                <p className="text-gray-600 text-center text-sm leading-relaxed line-clamp-5 italic">
                  "{testimonial.Testimonial_text}"
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .testimonial-swiper {
          padding: 20px 40px;
        }
        .testimonial-swiper .swiper-button-next,
        .testimonial-swiper .swiper-button-prev {
          color: #4B5563;
          background: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .testimonial-swiper .swiper-button-next:after,
        .testimonial-swiper .swiper-button-prev:after {
          font-size: 18px;
        }
        .testimonial-swiper .swiper-pagination-bullet {
          background: #4B5563;
          opacity: 0.5;
        }
        .testimonial-swiper .swiper-pagination-bullet-active {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default Testimonial;