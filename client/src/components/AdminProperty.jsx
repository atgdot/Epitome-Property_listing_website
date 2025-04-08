import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { FiFilter } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";

import PropertyCard from "./PropertyCard";
import HighRiseCard from "./HighRiseCard";

import {
  createProperty,
  updateProperty,
  deleteProperty,
  getAllProperties,
  clearError,
} from "../utils/Store/slice/propertySlice";

const AdminProperty = () => {
  const dispatch = useDispatch();
  const { properties, loading, error } = useSelector((state) => state.property);


  // Modal & UI state
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);

  // Form state with all media fields as arrays and subCategory stored as an array
  const initialFormData = {
    category: "Residential",
    subCategory: "Luxury Projects",
    title: "",
    location: "",
    address: "",
    pincode: "",
    description: "",
    price: "",
    Rental_Yield: "",
    current_Rental: "",
    Area: "",
    Tenure: "",
    Tenant: "",
    property_Image: [],
    logo_image: [],
    header_images: [],
    about_image: [],
    highlight_image: [],
    gallery_image: [],
    floor_plans: [],
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);


  // Fetch all properties on mount
  useEffect(() => {
    dispatch(getAllProperties());
  }, [dispatch]);

  // Log any errors
  useEffect(() => {
    if (error) console.error("Redux Property Error:", error);
  }, [error]);

  // Reset form
  const resetForm = () => {
    setFormData(initialFormData);
    setEditingProperty(null);
  };

  // Handler for file inputs that now supports multiple files and stores data in an array
  const handleMediaChange = (field) => (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const imagesArray = [];
      let loaded = 0;
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onloadend = () => {
          imagesArray.push(reader.result);
          loaded++;
          if (loaded === files.length) {
            setFormData((prev) => ({ ...prev, [field]: imagesArray }));
          }
        };
        reader.readAsDataURL(files[i]);
      }
    } else {
      setFormData((prev) => ({ ...prev, [field]: [] }));
    }
  };

  // Category & Subcategory handling
  const handleCategoryChange = (value) => {
    // For 'residential' we use a default subCategory; for 'featured' and 'trending', we store an empty array.
    const defaultSub = value === "Residential" ? "Luxury Projects" : "Offices";
    setFormData((prev) => ({
      ...prev,
      category: value,
      subCategory: defaultSub ? defaultSub : "",
    }));
  };
  const handleSubCategoryChange = (value) => {

    setFormData((prev) => {
      const newData = { ...prev, subCategory: value };

      return newData;
    });
  };

  // Floor plans dynamic fields
  const addFloorPlan = () => {
    setFormData((prev) => ({
      ...prev,
      floor_plans: [
        ...prev.floor_plans,
        { description: "", area: "", image: "" },
      ],
    }));
  };
  const removeFloorPlan = (index) => {
    setFormData((prev) => ({
      ...prev,
      floor_plans: prev.floor_plans.filter((_, i) => i !== index),
    }));
  };
  const handleFloorPlanChange = (index, field, value) => {
    const updated = [...formData.floor_plans];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, floor_plans: updated }));
  };

  // Open modal for add/edit
  const openEditModal = (property = null) => {
    dispatch(clearError());
    setEditingProperty(property);
    if (property) {
      // Populate formData from existing property
      setFormData({
        category: property.category,
        subCategory: property.subCategory,
        city: property.city,
        title: property.title,
        location: property.location || "",
        sector: property.sector || "",
        address: property.address || "",
        pincode: property.pincode || "",
        description: property.description,
        price: property.price,
        Rental_Yield: property.Rental_Yield || "",
        current_Rental: property.current_Rental || "",
        Area: property.Area || "",
        Tenure: property.Tenure || "",
        Tenant: property.Tenant || "",
        property_Image: property.property_Image || [],
        logo_image: property.logo_image || [],
        header_images: property.header_images || [],
        about_image: property.about_image || [],
        highlight_image: property.highlight_image || [],
        gallery_image: property.gallery_image || [],
        floor_plans: property.floor_plans || [],
      });
    } else {
      resetForm();
    }
    setShowModal(true);
  };

  // Delete property
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      dispatch(deleteProperty(id))
        .unwrap()
        .catch((err) =>
          alert(`Error: ${err.message || "Failed to delete property."}`)
        );
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    dispatch(clearError());

    // Prepare data
    const payload = { ...formData };

    // Clean up price
    if (typeof payload.price === "string") {
      payload.price = payload.price.replace("₹", "").trim();
    }

    // Remove empty media fields
    [
      "property_Image",
      "logo_image",
      "header_images",
      "about_image",
      "highlight_image",
      "gallery_image",
    ].forEach((f) => {
      if (!payload[f] || payload[f].length === 0) delete payload[f];
    });

    // Remove empty floor_plans
    if (!payload.floor_plans.length) delete payload.floor_plans;

    try {
      if (editingProperty) {
        await dispatch(
          updateProperty({ id: editingProperty._id, propertyData: payload })
        ).unwrap();
      } else {
        await dispatch(createProperty(payload)).unwrap();
      }
      setShowModal(false);
      resetForm();
    } catch (err) {
      alert(`Error: ${err.message || "Failed to save property."}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter & search logic
  const filtered = Array.isArray(properties)
    ? properties.filter((p) => {
      if (filterCategory !== "all" && p.category !== filterCategory)
        return false;
      if (searchQuery) {
        const term = searchQuery.toLowerCase();
        return [p.title, p.city, p.location].some((v) =>
          v?.toLowerCase().includes(term)
        );
      }
      return true;
    })
    : [];

  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Admin Property Management
      </h1>

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <button
          onClick={() => setShowFilterPanel((v) => !v)}
          className="flex items-center px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-sm"
        >
          <FiFilter className="mr-2" /> Filter
        </button>
        <div className="flex border rounded-lg bg-white w-full md:w-80 overflow-hidden shadow-sm">
          <input
            type="text"
            placeholder="Search by title, city, location..."
            className="px-4 py-2 w-full text-sm outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="px-4 py-2 bg-blue-600 text-white">
            <FaSearch />
          </button>
        </div>
        <button
          onClick={() => openEditModal()}
          className="flex items-center gap-1 px-4 py-2 bg-green-500 text-white rounded-lg text-sm"
        >
          <MdEdit /> Add New Property
        </button>
      </div>

      {/* Filter Panel */}
      {showFilterPanel && (
        <div className="mb-4">
          <label className="mr-2">Filter by Category:</label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="all">All</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Trending">Trending</option>
            <option value="Featured">Featured</option>
          </select>
        </div>
      )}

      {/* Listing */}
      {loading && (
        <div className="text-center p-4">Loading properties...</div>
      )}
      {error && !loading && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4 text-center">
          Error: {error.message || "Failed to load data."}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((property) =>
          property.category === "residential" ? (
            <HighRiseCard
              key={property._id}
              property={property}
              editable
              onEdit={() => openEditModal(property)}
              onDelete={() => handleDelete(property._id)}
            />
          ) : (
            <PropertyCard
              key={property._id}
              property={property}
              editable
              onEdit={() => openEditModal(property)}
              onDelete={() => handleDelete(property._id)}
            />
          )
        )}
      </div>

      {/* No data messages */}
      {!loading && filtered.length === 0 && properties.length > 0 && (
        <div className="text-center mt-6 text-gray-500">
          No properties found matching your criteria.
        </div>
      )}
      {!loading && properties.length === 0 && (
        <div className="text-center mt-6 text-gray-500">
          No properties available. Add a new property to get started.
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-2 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl p-4 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-3 border-b pb-2">
              {editingProperty ? "Edit Property" : "Add New Property"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Category */}
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Category*
                  </label>
                  <select
                    className="w-full p-2 border rounded text-xs"
                    value={formData.category}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    required
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Trending">Trending</option>
                    <option value="Featured">Featured</option>
                  </select>
                </div>

                {/* Render SubCategory only if category is not "featured" or "trending" */}
                {formData.category !== "Featured" &&
                  formData.category !== "Trending" && (
                    <div>
                      <label className="block text-xs font-medium mb-1">
                        Sub Category*
                      </label>
                      <select
                        className="w-full p-2 border rounded text-xs"
                        value={formData.subCategory}

                        onChange={(e) => handleSubCategoryChange(e.target.value)}
                        required
                      >
                        {formData.category === "Residential" ? (
                          <>
                            <option value="Luxury Project">Luxury Project</option>
                            <option value="Upcoming Project">Upcoming Project</option>
                            <option value="High Rise Apartment">High Rise Apartment</option>
                          </>
                        ) :
                          (
                            <>
                              <option value="Offices">Offices</option>
                              <option value="Pre Leased Offices">Pre-Leased Offices</option>
                              <option value="Pre-Rented">Pre-Rented</option>
                              <option value="SCO">SCO</option>
                            </>
                          )
                        }

                      </select>
                    </div>
                  )}

                {/* Title */}
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Title*
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded text-xs"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    required
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs font-medium mb-1">
                    City*
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded text-xs"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, city: e.target.value }))
                    }
                    required
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded text-xs"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                    required
                  />
                  {/* Sector */}
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Sector
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded text-xs"
                    value={formData.sector}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        sector: e.target.value,
                      }))
                    }
                    required
                  />
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium mb-1">
                    Address
                  </label>
                  <textarea
                    className="w-full p-2 border rounded text-xs"
                    rows={2}
                    value={formData.address}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                  />
                </div>

                {/* Pincode */}
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Pincode
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded text-xs"
                    value={formData.pincode}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        pincode: e.target.value,
                      }))
                    }
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium mb-1">
                    Description*
                  </label>
                  <textarea
                    className="w-full p-2 border rounded text-xs"
                    rows={3}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    required
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Price (₹)*
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded text-xs"
                    placeholder="e.g., 4.86 Cr or 48600000"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        price: e.target.value,
                      }))
                    }
                    required
                  />
                </div>

                {/* Rental Yield */}
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Rental Yield (%)
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded text-xs"
                    placeholder="e.g., 5.2"
                    value={formData.Rental_Yield}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        Rental_Yield: e.target.value,
                      }))
                    }
                  />
                </div>

                {/* Current Rental */}
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Current Rental (₹)
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded text-xs"
                    placeholder="e.g., 2.6 Lakh/month or 260000"
                    value={formData.current_Rental}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        current_Rental: e.target.value,
                      }))
                    }
                  />
                </div>

                {/* Area */}
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Area (sqft)
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded text-xs"
                    placeholder="e.g., 3500"
                    value={formData.Area}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        Area: e.target.value,
                      }))
                    }
                  />
                </div>

                {/* Tenure */}
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Lease Tenure
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded text-xs"
                    placeholder="e.g., 9 years"
                    value={formData.Tenure}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        Tenure: e.target.value,
                      }))
                    }
                  />
                </div>

                {/* Tenant */}
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Tenant Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded text-xs"
                    value={formData.Tenant}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        Tenant: e.target.value,
                      }))
                    }
                  />
                </div>

                {/* Property Image */}
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Property Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="w-full text-xs"
                    onChange={handleMediaChange("property_Image")}
                  />
                </div>

                {/* Logo Image */}
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Logo Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="w-full text-xs"
                    onChange={handleMediaChange("logo_image")}
                  />
                </div>

                {/* Header Images */}
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Header Images
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="w-full text-xs"
                    onChange={handleMediaChange("header_images")}
                  />
                </div>

                {/* About Image */}
                <div>
                  <label className="block text-xs font-medium mb-1">
                    About Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="w-full text-xs"
                    onChange={handleMediaChange("about_image")}
                  />
                </div>

                {/* Highlight Image */}
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Highlight Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="w-full text-xs"
                    onChange={handleMediaChange("highlight_image")}
                  />
                </div>

                {/* Gallery Image */}
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Gallery Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="w-full text-xs"
                    onChange={handleMediaChange("gallery_image")}
                  />
                </div>
              </div>

              {/* Floor Plans Section */}
              <div className="mt-4">
                <h3 className="text-base font-semibold mb-2">Floor Plans</h3>
                {formData.floor_plans.map((plan, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-3 items-end"
                  >
                    <div className="md:col-span-2">
                      <label className="block text-xs mb-1">
                        Description
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded text-xs"
                        value={plan.description}
                        onChange={(e) =>
                          handleFloorPlanChange(idx, "description", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-xs mb-1">
                        Area (sqft)
                      </label>
                      <input
                        type="number"
                        className="w-full p-2 border rounded text-xs"
                        value={plan.area}
                        onChange={(e) =>
                          handleFloorPlanChange(idx, "area", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-xs mb-1">
                        Plan Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="w-full text-xs"
                        onChange={(e) => {
                          const files = e.target.files;
                          if (files && files.length > 0) {
                            const imagesArray = [];
                            let loaded = 0;
                            for (let i = 0; i < files.length; i++) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                imagesArray.push(reader.result);
                                loaded++;
                                if (loaded === files.length) {
                                  handleFloorPlanChange(idx, "image", imagesArray);
                                }
                              };
                              reader.readAsDataURL(files[i]);
                            }
                          }
                        }}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFloorPlan(idx)}
                      className="px-2 py-1 bg-red-500 text-white text-xs rounded"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addFloorPlan}
                  className="px-4 py-2 bg-blue-600 text-white rounded text-sm"
                >
                  Add Floor Plan
                </button>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-3 mt-6 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                    dispatch(clearError());
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded text-sm disabled:bg-blue-300"
                >
                  {isSubmitting
                    ? "Submitting..."
                    : editingProperty
                      ? "Update Property"
                      : "Create Property"}
                </button>
              </div>

              {error && isSubmitting && (
                <p className="text-red-600 text-xs mt-2 text-right">
                  {error.message || "Submission failed."}
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProperty;