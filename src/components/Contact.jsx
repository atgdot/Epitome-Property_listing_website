import React from "react";

const Contact = () => {
    return (
        <>
            <h2 className="text-2xl font-semibold text-black text-center mb-6">
                Consult A Property Expert Now
            </h2>
            <div className="flex flex-col md:flex-row items-center  justify-center bg-white px-6 md:px-20 py-10">
                {/* Left Section - Contact Form (65%) */}
                <div className="w-full md:w-[65%] bg-white p-6 md:p-10 rounded-lg border-1 border-r-0 border-gray-200">
                    <form className="flex flex-col space-y-4">
                        {/* Name Field */}
                        <div>
                            <label className="text-gray-700 font-medium">Your Name</label>
                            <input
                                type="text"
                                className="w-full p-3 mt-1 border-2 border-gray-300 rounded-lg focus:shadow-lg focus:outline-none focus:border-[#043268]"
                                placeholder="Enter your name"
                            />
                        </div>

                        {/* Email & Phone Number Side by Side */}
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Email Field */}
                            <div className="w-full">
                                <label className="text-gray-700 font-medium">Email</label>
                                <input
                                    type="email"
                                    className="w-full p-3 mt-1 border-2 border-gray-300 rounded-lg focus:shadow-lg focus:outline-none focus:border-[#043268]"
                                    placeholder="Enter your email"
                                />
                            </div>

                            {/* Phone Number Field */}
                            <div className="w-full">
                                <label className="text-gray-700 font-medium">Phone Number</label>
                                <input
                                    type="tel"
                                    className="w-full p-3 mt-1 border-2 border-gray-300 rounded-lg focus:shadow-lg focus:outline-none focus:border-[#043268]"
                                    placeholder="Enter your phone number"
                                />
                            </div>
                        </div>

                        {/* Message Field */}
                        <div>
                            <label className="text-gray-700 font-medium">Message</label>
                            <textarea
                                rows="4"
                                className="w-full p-3 mt-1 border-2 border-gray-300 rounded-lg focus:shadow-lg focus:outline-none focus:border-[#043268]"
                                placeholder="Enter your message"
                            />
                        </div>

                        {/* Submit Button */}
                        <button className="w-1/5 bg-[#043268] text-white py-3 rounded-lg hover:bg-[#043268] hover:cursor-pointer transition duration-300">
                            Submit
                        </button>
                    </form>
                </div>

                {/* Right Section - Contact Image (35%) */}
                <div className="w-full md:w-[26%] h-[35%] flex justify-center mt-6 md:mt-0">
                    <img
                        src="https://www.shutterstock.com/image-photo/woman-using-laptop-searching-web-600nw-2426977527.jpg"
                        alt="Contact Us"
                        className="w-[80%] md:w-[90%] rounded-lg shadow-lg"
                    />
                </div>
            </div>
        </>
    );
};

export default Contact;
