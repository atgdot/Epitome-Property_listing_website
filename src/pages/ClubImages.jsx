import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import React from "react";
const images = [
    "/image1.jpg",
    "/image2.jpg",
    "/image3.jpg",
    "/image4.jpg",
    "/image5.jpg",
    "/image6.jpg",
    "/image7.jpg",
];

const ClubImages = () => {
    return (
        <div className="max-w-7xl mx-auto py-10">
            <div className="flex justify-center my-4">
                <div className="flex items-center w-full max-w-lg">
                    <div className="flex-1 border-t border-gray-400"></div>
                    <p className="mx-2 px-2 text-gray-600 whitespace-nowrap">Gallery</p>
                    <div className="flex-1 border-t border-gray-400"></div>
                </div>
            </div>
            <h2 className="text-2xl font-semibold text-center mb-6">
                Indiabulls Estate Club Images
            </h2>
            <div className="relative">
                <Swiper
                    slidesPerView={5}
                    spaceBetween={15}
                    navigation={{
                        nextEl: ".custom-next",
                        prevEl: ".custom-prev",
                    }}
                    modules={[Navigation]}
                    className="flex items-center"
                >
                    {images.map((src, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={src}
                                alt={`Slide ${index + 1}`}
                                className="rounded-lg shadow-lg w-full h-40 object-cover"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <button className="custom-prev absolute cursor-pointer left-0 top-1/2 transform -translate-y-1/2  z-10">
                    <img src="/pre.png" alt="Previous" className="w-10 h-10" />
                </button>
                <button className="custom-next absolute cursor-pointer right-0 top-1/2 transform -translate-y-1/2   z-10">
                    <img src="/next.png" alt="Next" className="w-10 h-10" />
                </button>
            </div>
        </div>
    );
};

export default ClubImages;
