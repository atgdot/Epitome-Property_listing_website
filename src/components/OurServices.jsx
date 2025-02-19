import React from 'react';
import { FaBriefcase, FaBalanceScale, FaHome } from 'react-icons/fa';

const services = [
    {
        id: 1,
        title: "Consulting",
        description: "We provide expert consulting services to help businesses grow and succeed. Our experienced team offers strategic insights and practical solutions.",
        icon: "/discussion.png",
    },
    {
        id: 2,
        title: "Legal Advising",
        description: "Our legal advisors offer professional guidance on a wide range of legal matters, ensuring that your business remains compliant and protected.",
        icon: "/chat-bubble.png",
    },
    {
        id: 3,
        title: "Interior Design",
        description: "We specialize in creating aesthetically pleasing and functional interior spaces tailored to your specific needs and preferences.",
        icon: "/staircase.png",

    },
];

const OurServices = () => {
    return (
        <div className="w-full lg:px-20 py-16 bg-white">
            <h2 className="text-3xl font-bold text-center text-black mb-8">Our Services</h2>

            {/* Grid layout for services */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                {services.map((service) => (
                    <div
                    key={service.id}
                    className={`border-2 ${
                      service.id === 3 ? 'bg-[#043268] text-white' : 'bg-white'
                    } border-gray-400 p-6 rounded-bl-2xl shadow-lg text-center`}
                  >
                  
                        <div className="flex justify-center">
                            {/* Center the icon */}
                            <img src={service.icon} alt="" />
                            
                        </div>
                        <h3 className="text-2xl font-semibold  mb-4">{service.title}</h3>
                        <p className="">{service.description}</p>
                    </div>

                ))}
            </div>
        </div>
    );
};

export default OurServices;
