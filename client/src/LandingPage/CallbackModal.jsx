import React from "react";

const CallbackModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-60 p-4">
      <div className="bg-gray-100 rounded-2xl p-6 w-full max-w-md relative shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-blue-800">Instant Callback</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Name</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Contact No *
            </label>
            <input
              type="tel"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Phone Number"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Email (Optional)
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Email Address"
            />
          </div>

          <p className="text-sm text-gray-500 mt-2 italic">
            * Your information will be kept strictly confidential and will not
            be shared, sold, or otherwise disclosed.
          </p>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-all font-medium shadow-md hover:shadow-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CallbackModal;
