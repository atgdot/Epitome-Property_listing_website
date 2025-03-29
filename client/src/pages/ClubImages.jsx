import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import React from "react";
const images = [
    "https://imagizer.imageshack.com/img924/9166/tiL2ZK.png",
    "https://imagizer.imageshack.com/img923/112/ZkaqFN.png",
    "https://imagizer.imageshack.com/img922/9415/9Kqiza.png",
    "https://imagizer.imageshack.com/img924/9166/tiL2ZK.png",
    "https://imagizer.imageshack.com/img923/112/ZkaqFN.png",
    "https://imagizer.imageshack.com/img922/9415/9Kqiza.png",
    "https://imagizer.imageshack.com/img923/112/ZkaqFN.png",
];

const ClubImages = () => {
    return (
        <div className="max-w-7xl mx-auto py-10 px-4">
           <div className="flex justify-center my-4">
                <div className="flex items-center w-60">
                    <div className="flex-1 border-t border-black"></div>
                    <p className="mx-1 text-black whitespace-nowrap">Gallery</p>
                    <div className="flex-1 border-t border-black"></div>
                </div>
            </div>
            <h2 className="text-2xl font-semibold text-center mb-6">
                Indiabulls Estate Club Images
            </h2>
            <div className="relative">
                <Swiper
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 5 }
                    }}
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
                <button className="custom-prev absolute cursor-pointer left-0 md:left-[-20px] top-1/2 transform -translate-y-1/2 z-10">
                    <img src="/pre.png" alt="Previous" className="w-8 h-8 md:w-10 md:h-10" />
                </button>
                <button className="custom-next absolute cursor-pointer right-0 md:right-[-20px] top-1/2 transform -translate-y-1/2 z-10">
                    <img src="/next.png" alt="Next" className="w-8 h-8 md:w-10 md:h-10" />
                </button>
            </div>
        </div>
    );
};


export default ClubImages;
