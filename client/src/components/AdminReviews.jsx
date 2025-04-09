import React, { useContext, useState, useEffect } from 'react';
import { TestimonialContext } from "../Context/TestimonialContext";

const AdminReviews = () => {
  const { testimonials, saveTestimonials, loading: contextLoading, error: contextError, refreshTestimonials } = useContext(TestimonialContext);
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    text: '',
    rating: 5,
    profile_photo: null,
    imagePreview: ''
  });

  // Use context's loading state
  useEffect(() => {
    if (contextError) {
      setError(contextError);
    }
  }, [contextError]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profile_photo: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRatingChange = (newRating) => {
    setFormData(prev => ({
      ...prev,
      rating: parseInt(newRating)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('Designation', formData.designation);
      submitData.append('Testimonial_text', formData.text);
      submitData.append('rating', parseInt(formData.rating));

      if (formData.profile_photo) {
        submitData.append('profile_photo', formData.profile_photo);
      }

      const response = await fetch('http://localhost:3000/api/v1/admin-dashboard/review/add', {
        method: 'POST',
        body: submitData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error: ${response.status}`);
      }

      const result = await response.json();
      console.log('Success:', result);

      // Refresh testimonials from the server
      refreshTestimonials();

      // Reset form
      setFormData({
        name: '',
        designation: '',
        text: '',
        rating: 5,
        profile_photo: null,
        imagePreview: ''
      });
      setEditingId(null);

    } catch (error) {
      console.error('Error submitting testimonial:', error);
      setError(error.message || 'Failed to submit testimonial. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (index) => {
    setFormData(testimonials[index]);
    setEditingId(index);
  };

  const handleDelete = async (index) => {
    const testimonialId = testimonials[index]._id;

    if (!testimonialId) {
      setError('Cannot delete: Invalid testimonial ID');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this testimonial?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/v1/admin-dashboard/review/${testimonialId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        // Refresh testimonials from the server
        refreshTestimonials();
      } else {
        throw new Error(result.message || 'Failed to delete testimonial');
      }
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      setError(error.message || 'Failed to delete testimonial. Please try again.');
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Testimonials</h1>

      {(error || contextError) && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error || contextError}
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
            {formData.imagePreview && (
              <div className="mt-2">
                <img
                  src={formData.imagePreview}
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
          className={`mt-4 px-6 py-2 rounded ${isSubmitting
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
        {contextLoading ? (
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
                        src={testimonial.profile_photo || '/placeholder-avatar.png'}
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