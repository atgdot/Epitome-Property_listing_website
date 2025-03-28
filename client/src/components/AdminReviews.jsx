import React, { useContext, useState } from 'react';
import { TestimonialContext } from "../Context/TestimonialContext";

const AdminReviews = () => {
  const { testimonials, saveTestimonials } = useContext(TestimonialContext);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    text: '',
    rating: 5,
    image: ''
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRatingChange = (newRating) => {
    setFormData({
      ...formData,
      rating: newRating
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTestimonials = [...testimonials];
    
    if (editingId !== null) {
      newTestimonials[editingId] = formData;
    } else {
      newTestimonials.push(formData);
    }
    
    saveTestimonials(newTestimonials);
    setFormData({
      name: '',
      designation: '',
      text: '',
      rating: 5,
      image: ''
    });
    setEditingId(null);
  };

  const handleEdit = (index) => {
    setFormData(testimonials[index]);
    setEditingId(index);
  };

  const handleDelete = (index) => {
    const newTestimonials = testimonials.filter((_, i) => i !== index);
    saveTestimonials(newTestimonials);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Testimonials</h1>
      
      <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Designation:</label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block mb-2">Testimonial Text:</label>
            <textarea
              name="text"
              value={formData.text}
              onChange={handleInputChange}
              className="w-full p-2 border rounded h-32"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Rating:</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => handleRatingChange(star)}
                  className={`text-2xl ${star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block mb-2">Profile Photo:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-2 border rounded"
            />
            {formData.image && (
              <div className="mt-2">
                <img 
                  src={formData.image} 
                  alt="Preview" 
                  className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                />
              </div>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {editingId !== null ? 'Update Testimonial' : 'Add Testimonial'}
        </button>
      </form>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Current Testimonials</h2>
        <div className="space-y-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="border-b pb-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-3"
                  />
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-gray-600">{testimonial.designation}</p>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => handleEdit(index)}
                    className="mr-2 text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="flex mt-2 ml-16">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`text-lg ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminReviews;