import React, { useContext, useState, useEffect } from 'react';
import { TestimonialContext } from "../Context/TestimonialContext";

const AdminReviews = () => {
  const { testimonials, saveTestimonials } = useContext(TestimonialContext);
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    text: '',
    rating: 5,
    image: ''
  });

  // Fetch all reviews when component mounts
  useEffect(() => {
    fetchAllReviews();
  }, []);

  const fetchAllReviews = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/v1/admin-dashboard/review/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      console.log('Fetched reviews:', result);
      
      if (result.success && result.data) {
        // Update testimonials in context
        saveTestimonials(result.data);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setError('Failed to load testimonials. Please refresh the page.');
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Make POST request to the API endpoint
      const response = await fetch('http://localhost:3000/api/v1/admin-dashboard/review/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      console.log('Success:', result);
      
      // Refresh the testimonials list after adding new one
      fetchAllReviews();
      
      // Reset form
      setFormData({
        name: '',
        designation: '',
        text: '',
        rating: 5,
        image: ''
      });
      setEditingId(null);
      
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      setError('Failed to submit testimonial. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (index) => {
    setFormData(testimonials[index]);
    setEditingId(index);
  };

  const handleDelete = async (index) => {
    // Assuming each testimonial has an _id from MongoDB
    const testimonialId = testimonials[index]._id;
    
    try {
      // Optional: Add API call to delete from backend
      // const response = await fetch(`http://localhost:3000/api/v1/admin-dashboard/review/delete/${testimonialId}`, {
      //   method: 'DELETE',
      // });
      // 
      // if (!response.ok) {
      //   throw new Error(`Error: ${response.status}`);
      // }
      
      const newTestimonials = testimonials.filter((_, i) => i !== index);
      saveTestimonials(newTestimonials);
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      setError('Failed to delete testimonial. Please try again.');
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Testimonials</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
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
          disabled={isSubmitting}
          className={`mt-4 px-6 py-2 rounded ${
            isSubmitting 
              ? 'bg-blue-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isSubmitting 
            ? 'Submitting...' 
            : editingId !== null 
              ? 'Update Testimonial' 
              : 'Add Testimonial'
          }
        </button>
      </form>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Current Testimonials</h2>
        {isLoading ? (
          <p className="text-gray-500">Loading testimonials...</p>
        ) : (
          <div className="space-y-4">
            {testimonials.length === 0 ? (
              <p className="text-gray-500">No testimonials yet.</p>
            ) : (
              testimonials.map((testimonial, index) => (
                <div key={testimonial._id || index} className="border-b pb-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <img
                        src={testimonial.image || '/placeholder-avatar.png'}
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
                  <p className="mt-2 ml-16 text-gray-700">{testimonial.text}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReviews;