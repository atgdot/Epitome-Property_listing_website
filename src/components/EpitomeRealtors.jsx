import React from "react";

export default function EpitomeRealtors() {
    return (
        <div className="flex flex-col w-max-7xl items-center justify-center h-2/3 ">
            <h1 className="text-2xl font-bold text-blue-900 mb-6">Epitome Realtors</h1>
            <div className="bg-gray-200 w-full  p-8 text-center rounded-lg shadow-lg ">
                <p className="text-gray-700 text-lg mt-20">
                    Real Estate Company Specializes In Providing Premier Property Solutions
                    Tailored To Meet Your Needs.
                </p>
                <button className="bg-blue-900 mt-8 text-white px-6 py-2 rounded-lg text-lg shadow-md hover:bg-blue-800">
                    Contact Us
                </button>
                <p className="text-gray-500 text-sm mt-8">&copy; Epitome Realtors</p>

                <div className="flex mt-8 justify-center md:space-x-20 space-x-4 ">
                    <div className="h-14 w-40 ">
                        <img className="h-full w-full" src="/logo.png" alt="" />
                    </div>
                    <div className="flex space-x-4">

                        <span className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-500 text-gray-500 cursor-pointer">
                            <img className="h-full w-full" src="linkedin.png" alt="" />
                        </span>
                        <span className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-500 text-gray-500 cursor-pointer">
                            <img className="h-full w-full" src="Facebook.png" alt="" />
                        </span>
                        <span className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-500 text-gray-500 cursor-pointer">
                            <img class="h-full w-full" src="Facebook.png" alt="" />
                        </span>


                        <span className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-500 text-gray-500 cursor-pointer">
                            <img className="h-full w-full" src="insta.png" alt="" />
                        </span>


                        <span className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-500 text-gray-500 cursor-pointer">
                            <img className="h-full w-full" src="Youtube.png" alt="" />
                        </span>

                    </div>

                </div>


            </div>


        </div>
    );
}
