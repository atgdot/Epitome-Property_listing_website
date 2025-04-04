import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [error, setError] = useState({});
  const [success, setSuccess] = useState("");

  const validate = () => {
    let errors = {};
    if (formData.name.length > 3000)
      errors.name = "Name cannot exceed 3000 characters";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errors.email = "Invalid email format";
    if (!/^[0-9]+$/.test(formData.phone))
      errors.phone = "Phone number must contain only digits";
    if (formData.message.length > 3000)
      errors.message = "Message cannot exceed 3000 characters";
    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSuccess("Form submitted successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setError({});
    } else {
      setSuccess("");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-black text-center mb-6">
        Consult A Property Expert Now
      </h2>
      <div className="flex flex-col md:flex-row items-center justify-between bg-white px-6 md:px-20 py-10">
        {/* Left Section - Contact Form */}
        <div className="w-full md:w-2/3 bg-white p-6 md:p-10 rounded-lg border border-gray-200">
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-gray-700 font-medium">Your Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-3 mt-1 border-2 border-gray-300 rounded-lg"
                placeholder="Enter your name"
              />
              {error.name && (
                <p className="text-red-500 text-sm">{error.name}</p>
              )}
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full">
                <label className="text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full p-3 mt-1 border-2 border-gray-300 rounded-lg"
                  placeholder="Enter your email"
                />
                {error.email && (
                  <p className="text-red-500 text-sm">{error.email}</p>
                )}
              </div>
              <div className="w-full">
                <label className="text-gray-700 font-medium">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full p-3 mt-1 border-2 border-gray-300 rounded-lg"
                  placeholder="Enter your phone number"
                />
                {error.phone && (
                  <p className="text-red-500 text-sm">{error.phone}</p>
                )}
              </div>
            </div>
            <div>
              <label className="text-gray-700 font-medium">Message</label>
              <textarea
                rows="4"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full p-3 mt-1 border-2 border-gray-300 rounded-lg"
                placeholder="Enter your message"
              />
              {error.message && (
                <p className="text-red-500 text-sm">{error.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-1/5 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Submit
            </button>
            {success && (
              <p className="text-green-500 text-sm mt-2">{success}</p>
            )}
          </form>
        </div>
        {/* Right Section - Contact Image */}
        <div className="w-full md:w-1/3 flex md:ml-15  justify-center mt-6 md:mt-0">
          <img
            src="https://i.ibb.co/WZFvSP3/efeeafabbd74b8f7d9bc42052c52fc97.jpg"
            alt="Contact Us"
            className="w-full md:w-auto max-w-xs rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
