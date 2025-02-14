import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { FaStar } from "react-icons/fa";

const testimonials = [
    { name: "John Doe", designation: "Software Engineer", text: "This service is amazing! It exceeded my expectations.", rating: 5, image: "/user1.jpg" },
    { name: "Jane Smith", designation: "Marketing Manager", text: "Great experience, very professional and helpful.", rating: 4, image: "/user2.jpg" },
    { name: "David Wilson", designation: "Product Designer", text: "Highly recommend it to anyone looking for quality work.", rating: 5, image: "/user3.jpg" },
    { name: "Emily Brown", designation: "Business Analyst", text: "Quick and reliable service. Very satisfied!", rating: 4, image: "/user4.jpg" },
    { name: "Michael Lee", designation: "Data Scientist", text: "Professional and efficient. Worth every penny!", rating: 5, image: "/user5.jpg" },
    { name: "Sophia Martinez", designation: "UI/UX Designer", text: "Fantastic experience, will use again for sure.", rating: 4, image: "/user6.jpg" },
    { name: "James Anderson", designation: "Project Manager", text: "Great customer support and high-quality work!", rating: 5, image: "/user7.jpg" },
    { name: "Olivia Taylor", designation: "HR Specialist", text: "Smooth process and excellent results.", rating: 5, image: "/user8.jpg" },
    { name: "William Johnson", designation: "Consultant", text: "Absolutely loved the service. Will recommend!", rating: 5, image: "/user9.jpg" },
];

const Testimonial = () => {
    return (
        <div className="w-full py-10 px-5 lg:px-16 bg-white">
            <h2 className="text-center text-3xl font-semibold text-orange-500 mb-8">
                What Our Clients Say
            </h2>

            {/* Swiper Container */}
            <Swiper
                slidesPerView={1}
                spaceBetween={20}
                breakpoints={{
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                pagination={{ clickable: true }} // Let Swiper handle it automatically
                modules={[Pagination]}
                className="w-full px-6"
            >
                {testimonials.map((testimonial, index) => (
                    <SwiperSlide key={index}>
                        <div className="border-2 border-orange-500 p-6 rounded-lg shadow-md bg-white flex flex-col items-center h-[280px] md:h-[400px]">
                            {/* Rating */}
                            <div className="flex mb-4">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <FaStar
                                        key={i}
                                        className={`text-lg ${i < testimonial.rating ? "text-orange-500" : "text-gray-300"
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Testimonial Text */}
                            <p className="text-gray-700 italic text-center mb-4">
                                "{testimonial.text}"
                            </p>

                            {/* User Info */}
                            <div className="flex items-center w-full">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full object-cover border-2 border-orange-500"
                                />
                                <div className="ml-4">
                                    <h4 className="text-lg font-semibold text-gray-800">
                                        {testimonial.name}
                                    </h4>
                                    <p className="text-sm text-gray-600">{testimonial.designation}</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Pagination Moved Below */}
            <div className="mt-8 flex justify-center">
                <div className="swiper-pagination"></div>
            </div>
        </div>
    );
};

export default Testimonial;
