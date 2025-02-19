import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { FaStar } from "react-icons/fa";

const testimonials = [
    { name: "John Doe", designation: "Software Engineer", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip .", rating: 5, image: "/user.png" },
    { name: "Jane Smith", designation: "Marketing Manager", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip .", rating: 3, image: "/user.png" },
    { name: "David Wilson", designation: "Product Designer", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip .", rating: 5, image: "/user.png" },
    { name: "Emily Brown", designation: "Business Analyst", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ", rating: 4, image: "/user.png" },
    { name: "Michael Lee", designation: "Data Scientist", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ", rating: 3, image: "/user.png" },
    { name: "Sophia Martinez", designation: "UI/UX Designer", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ", rating: 4, image: "/user.png" },
    { name: "James Anderson", designation: "Project Manager", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip !", rating: 5, image: "/user.png" },
    { name: "Olivia Taylor", designation: "HR Specialist", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ", rating: 4, image: "/user.png" },
    { name: "William Johnson", designation: "Consultant", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ", rating: 5, image: "/user.png" },
];

const Testimonial = () => {
    return (
        <div className="w-full py-10 px-5 lg:px-16 bg-white">
            <h2 className="text-center text-2xl uppercase font-semibold text-black mb-8">
                What People Says
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
                        <div className="border-6 border-[#043268] p-6 rounded-lg shadow-md bg-white flex flex-col items-center h-[280px] md:h-[400px]">
                            {/* Rating */}
                            <div className="flex mb-4 mr-40">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <FaStar
                                        key={i}
                                        className={`text-lg w-8 h-8 ${i < testimonial.rating ? "text-yellow-300" : "text-gray-300"}`}
                                    />
                                ))}

                            </div>

                            {/* Testimonial Text */}
                            <p className="text-black  text-center mb-4">
                                {testimonial.text}
                            </p>

                            {/* User Info */}
                            <div className="flex items-center w-full mt-10">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-20 h-20 rounded-full object-cover "
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
