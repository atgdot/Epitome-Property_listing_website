import React from "react";

const CallbackModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-blue-800">Instant Callback</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Contact No *</label>
            <input
              type="tel"
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Phone Number"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email (Optional)</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email Address"
            />
          </div>

          <p className="text-sm text-gray-500 mt-2">
            Your information will be kept confidential.
          </p>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CallbackModal;
