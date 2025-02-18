import React from "react";

const EnquiryForm = () => {
  return (
    <div className="bg-[#002b5b] text-white py-12  md:px-30 flex flex-col md:flex-row justify-center items-center">
      <div className="md:w-2/5 text-center md:text-left">
        <h3 className="text-lg  tracking-wider  w-max pb-1 mb-2">──────── Contact</h3>
        <h2 className="text-3xl font-semibold mb-2">Make an Enquiry</h2>
        <p className="text-lg flex items-center gap-2">
          📞 +91 8527-134-491
        </p>
      </div>
      <div className="md:w-1/2 bg-opacity-10 p-6  rounded-lg w-full max-w-md mt-6 md:mt-0">
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter Your Name*"
            className="w-full p-3 bg-gray-800 border-1 border-gray-400 hover:border-gray-100 text-white rounded-lg focus:outline-none"
          />
          <input
            type="text"
            placeholder="Contact Number*"
            className="w-full p-3 bg-gray-800 border-1 border-gray-400 hover:border-gray-100 text-white rounded-lg focus:outline-none"
          />
          <input
            type="email"
            placeholder="Enter Your Email*"
            className="w-full p-3 bg-gray-800 border-1 border-gray-400 hover:border-gray-100 text-white rounded-lg focus:outline-none"
          />
          <p className="text-xs text-gray-300">
            * Your information will be kept strictly confidential and will not be shared, sold, or otherwise disclosed.
          </p>
          <button className="w-full p-3 bg-white border-1 border-gray-400 hover:border-gray-100 text-[#002b5b] font-semibold rounded-lg hover:bg-gray-200">
            Submit →
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnquiryForm;
