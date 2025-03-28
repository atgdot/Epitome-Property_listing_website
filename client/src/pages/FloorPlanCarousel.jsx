import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const floorPlans = [
    {
        title: "3 BHK - Aurum",
        size: "2444 - 2447 SQFT",
        image: "https://imagizer.imageshack.com/img923/3641/kpznjg.png",
    },
    {
        title: "3 BHK - Vantage",
        size: "2570 - 2572 SQFT",
        image: "https://imagizer.imageshack.com/img923/3641/kpznjg.png",
    },
    {
        title: "4 BHK - Crest",
        size: "3579 SQFT",
        image: "https://imagizer.imageshack.com/img923/3641/kpznjg.png",
    },
];

// Custom Next Arrow
const NextArrow = (props) => {
    const { onClick } = props;
    return (
        <div
            className="absolute top-1/2 right-0 transform -translate-y-1/2 cursor-pointer z-10"
            onClick={onClick}
        >
            <img src="/next.png" alt="Next" className="w-10 h-10" />
        </div>
    );
};

// Custom Prev Arrow
const PrevArrow = (props) => {
    const { onClick } = props;
    return (
        <div
            className="absolute top-1/2 left-0 transform -translate-y-1/2 cursor-pointer z-10"
            onClick={onClick}
        >
            <img src="/pre.png" alt="Previous" className="w-10 h-10" />
        </div>
    );
};

const FloorPlanCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0); // Track the current slide index

    // Handle beforeChange to update currentSlide
    const handleBeforeChange = (oldIndex, newIndex) => {
        setCurrentSlide(newIndex);
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        customPaging: (i) => (
            <div
                className={`w-4 h-4 border-2 rounded-full transition-all ${
                    i === currentSlide ? 'bg-blue-900' : 'bg-white'
                }`}
            ></div>
        ),
        dotsClass: "slick-dots flex justify-center space-x-2", // Ensure flex display
        beforeChange: handleBeforeChange, // Update currentSlide on slide change
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div className="max-w-8xl mx-auto p-4">
            <div className="flex justify-center my-4">
                <div className="flex items-center w-60">
                    <div className="flex-1 border-t border-black"></div>
                    <p className="mx-1 text-black whitespace-nowrap">Floor Plan</p>
                    <div className="flex-1 border-t border-black"></div>
                </div>
            </div>

            <h2 className="text-center text-2xl font-semibold mb-6">
                Indiabulls Estate Club Floor Plan
            </h2>

            <Slider {...settings}>
                {floorPlans.map((plan, index) => (
                    <div key={index} className="p-4">
                        <div className=" bg-white shadow-lg rounded-lg overflow-hidden border border-[#043268]">
                            <img
                                src={plan.image}
                                alt={plan.title}
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-4 bg-blue-900 text-white text-center">
                                <h3 className="text-lg font-bold">{plan.title}</h3>
                                <p>{plan.size}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default FloorPlanCarousel;
