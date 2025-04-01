import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { FiFilter } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import PropertyCard from "./PropertyCard";
import HighRiseCard from "./HighRiseCard";

import {
  createProperty,
  updateProperty,
  deleteProperty,
  getAllProperties,
  clearError,
} from '../utils/Store/slice/propertySlice';

const AdminProperty = () => {
  const dispatch = useDispatch();
  const { properties, loading, error } = useSelector(state => state.property);

  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [formData, setFormData] = useState({
    category: "residential",
    subCategory: "luxuryProjects",
    city: "GURGAON",
    status: "",
    title: "",
    image: "",
    description: "",
    price: "",
    rentalYield: "",
    area: "",
    currentRental: "",
    tenure: "",
    tenant: "",
    sector: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(getAllProperties());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      console.error("Redux Property Error:", error);
    }
  }, [error, dispatch]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, image: "" });
    }
  };

  const handleCategoryChange = (newCategory) => {
    let newSubCategory = "";
    if (newCategory === "residential") {
      newSubCategory = "luxuryProjects";
    } else if (newCategory === "commercial") {
      newSubCategory = "offices";
    } else {
      newSubCategory = "";
    }
    setFormData((prev) => ({
      ...prev,
      category: newCategory,
      subCategory: newSubCategory
    }));
  };

  const resetForm = () => {
    setFormData({
      category: "residential",
      subCategory: "luxuryProjects",
      city: "GURGAON",
      status: "",
      title: "",
      image: "",
      description: "",
      price: "",
      rentalYield: "",
      area: "",
      currentRental: "",
      tenure: "",
      tenant: "",
      sector: "",
    });
    setEditingProperty(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    dispatch(clearError());

    const propertyDataToSend = { ...formData };

    if (typeof propertyDataToSend.price === 'string') {
      propertyDataToSend.price = propertyDataToSend.price.replace("₹ ", "").trim();
    }
    if (typeof propertyDataToSend.currentRental === 'string') {
      propertyDataToSend.currentRental = propertyDataToSend.currentRental.replace("₹ ", "").trim();
    }

    if (!propertyDataToSend.image) {
      delete propertyDataToSend.image;
    }

    try {
      if (editingProperty) {
        const { id, ...updateData } = propertyDataToSend;
        await dispatch(updateProperty({ id: editingProperty._id, propertyData: updateData })).unwrap();
        console.log("Property updated successfully!");
      } else {
        await dispatch(createProperty(propertyDataToSend)).unwrap();
        console.log("Property created successfully!");
      }

      setShowModal(false);
      resetForm();
    } catch (err) {
      console.error('Failed to submit property:', err);
      alert(`Error: ${err?.message || 'Failed to save property. Please try again.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEditModal = (property = null) => {
    dispatch(clearError());
    setEditingProperty(property);
    if (property) {
      setFormData({
        ...property,
        price: typeof property.price === 'string' ? property.price.replace("₹ ", "").trim() : (property.price || ''),
        currentRental: typeof property.currentRental === 'string' ? property.currentRental.replace("₹ ", "").trim() : (property.currentRental || ''),
        image: property.image || ""
      });
    } else {
      resetForm();
    }
    setShowModal(true);
  };

  const handleDelete = (id) => {
    console.log('Deleting property ID from AdminProperty:', id);
    if (window.confirm('Are you sure you want to delete this property?')) {
      dispatch(deleteProperty(id))
        .unwrap()
        .then(() => {
          console.log('Property deleted successfully!');
        })
        .catch((err) => {
          console.error('Failed to delete property:', err);
          alert(`Error: ${err?.message || 'Failed to delete property.'}`);
        });
    }
  };

  const filteredProperties = Array.isArray(properties)
    ? properties.filter((property) => {
        if (!property || typeof property !== 'object') return false;
        if (!searchQuery) return true;
        const searchTerm = searchQuery.toLowerCase();
        return (
          property.title?.toLowerCase().includes(searchTerm) ||
          property.city?.toLowerCase().includes(searchTerm) ||
          property.sector?.toLowerCase().includes(searchTerm) ||
          property.category?.toLowerCase().includes(searchTerm) ||
          property.subCategory?.toLowerCase().includes(searchTerm) ||
          property.description?.toLowerCase().includes(searchTerm)
        );
      })
    : [];

  const renderFormSection = (title, fields) => (
    <div className="md:col-span-2 border-t pt-1 mt-1" key={title}>
      <h3 className="text-base font-semibold mb-1 text-[#043268]">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
        {fields.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name} className="block text-xs font-medium mb-1">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            {field.type === "select" ? (
              <select
                id={field.name}
                className="w-full p-1 border rounded text-xs focus:ring-blue-500 focus:border-blue-500"
                value={formData[field.name] || ''}
                onChange={(e) =>
                  field.onChange
                    ? field.onChange(e.target.value)
                    : setFormData({
                      ...formData,
                      [field.name]: e.target.value
                    })
                }
                required={field.required}
              >
                {field.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : field.type === "file" ? (
              <input
                id={field.name}
                type="file"
                onChange={handleImageChange}
                className="w-full p-1 border rounded text-xs file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                accept="image/*"
              />
            ) : field.type === "textarea" ? (
              <textarea
                id={field.name}
                className="w-full p-1 border rounded text-xs focus:ring-blue-500 focus:border-blue-500"
                value={formData[field.name] || ''}
                onChange={(e) =>
                  setFormData({ ...formData, [field.name]: e.target.value })
                }
                placeholder={field.placeholder}
                rows="2"
                required={field.required}
              ></textarea>
            ) : (
              <input
                id={field.name}
                type={field.type || "text"}
                className="w-full p-1 border rounded text-xs focus:ring-blue-500 focus:border-blue-500"
                placeholder={field.placeholder}
                value={formData[field.name] || ''}
                onChange={(e) =>
                  setFormData({ ...formData, [field.name]: e.target.value })
                }
                required={field.required}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const commonSection = {
    title: "Basic Information",
    fields: [
      {
        name: "category",
        label: "Category",
        type: "select",
        options: [
          { value: "residential", label: "RESIDENTIAL" },
          { value: "commercial", label: "Commercial" },
          { value: "trending", label: "Trending" },
          { value: "featured", label: "Featured" }
        ],
        onChange: handleCategoryChange,
        required: true
      },
      {
        name: "subCategory",
        label: "Sub Category",
        type: "select",
        options:
          formData.category === "residential"
            ? [
              { value: "luxuryProjects", label: "Luxury Projects" },
              { value: "upcomingProjects", label: "Upcoming Projects" },
              { value: "highRiseApartments", label: "High Rise Apartments" }
            ]
            : formData.category === "commercial"
              ? [
                { value: "offices", label: "Offices" },
                { value: "preLeasedOffices", label: "Pre-Leased Offices" },
                { value: "preRented", label: "Pre-Rented" },
                { value: "sco", label: "SCO" }
              ]
              : [],
        required: formData.category === "residential" || formData.category === "commercial"
      }
    ]
  };
  const residentialFormSections = [
    {
      title: "Residential Details",
      fields: [
        { name: "title", label: "Title", required: true },
        { name: "city", label: "City", required: true },
        { name: "sector", label: "Location/Sector", required: true },
        {
          name: "price",
          label: "Price (₹)",
          placeholder: "e.g., 4.86 Cr or 48600000",
          required: true
        },
        {
          name: "image",
          label: "Property Image (Optional)",
          type: "file",
          required: false
        }
      ]
    },
    {
      title: "Description",
      fields: [
        {
          name: "description",
          label: "Description",
          type: "textarea",
          placeholder: "Short description of the property"
        }
      ]
    }
  ];
  const nonResidentialFormSections = [
    {
      title: "Commercial/Other Details",
      fields: [
        { name: "title", label: "Title", required: true },
        { name: "city", label: "City", required: true },
        { name: "sector", label: "Location/Sector" },
        { name: "status", label: "Status", placeholder: "e.g., Under Construction, Ready to Move" },
        {
          name: "image",
          label: "Property Image (Optional)",
          type: "file",
          required: false
        }
      ]
    },
    {
      title: "Description",
      fields: [
        {
          name: "description",
          label: "Description",
          type: "textarea",
          placeholder: "Short description of the property"
        }
      ]
    },
    {
      title: "Pricing Information",
      fields: [
        {
          name: "price",
          label: "Price (₹)",
          placeholder: "e.g., 4.86 Cr or 48600000"
        },
        {
          name: "rentalYield",
          label: "Rental Yield (%)",
          placeholder: "e.g., 5.2"
        },
        {
          name: "currentRental",
          label: "Current Rental (₹)",
          placeholder: "e.g., 2.6 Lakh/month or 260000"
        }
      ]
    },
    {
      title: "Property Details",
      fields: [
        { name: "area", label: "Area (sqft)", placeholder: "e.g., 3500" },
        { name: "tenure", label: "Lease Tenure", placeholder: "e.g., 9 years" },
        { name: "tenant", label: "Tenant Name" },
      ]
    }
  ];

  const additionalSections =
    formData.category === "residential"
      ? residentialFormSections
      : formData.category === "commercial"
        ? nonResidentialFormSections
        : [];

  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Admin Property Management (Redux)
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <button className="flex items-center px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition text-sm">
          <FiFilter className="mr-2" /> Filter
        </button>

        <div className="flex border rounded-lg bg-white w-full md:w-80 overflow-hidden shadow-sm">
          <input
            type="text"
            placeholder="Search by title, city, location..."
            className="px-4 py-2 w-full outline-none text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white flex items-center transition-colors">
            <FaSearch />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => openEditModal()}
            className="flex items-center gap-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition text-sm shadow-sm"
          >
            <MdEdit /> Add New Property
          </button>
        </div>
      </div>

      {loading && <div className="text-center p-4">Loading properties...</div>}
      {error && !loading && (
        <div className="text-center p-4 bg-red-100 text-red-700 rounded mb-4">
          Error: {error.message || 'Failed to load data.'}
          <button onClick={() => dispatch(clearError())} className="ml-4 text-red-900 font-bold">X</button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => {
          const propertyId = property._id; // Ensure you use _id consistently
          return property.category === "residential" ? (
            <HighRiseCard
              key={propertyId}
              property={property}
              editable={true}
              onEdit={() => openEditModal(property)}
              onDelete={() => handleDelete(propertyId)}
            />
          ) : (
            <PropertyCard
              key={propertyId}
              property={property}
              editable={true}
              onEdit={() => openEditModal(property)}
              onDelete={() => handleDelete(propertyId)}
            />
          );
        })}
      </div>

      {!loading && filteredProperties.length === 0 && properties.length > 0 && (
        <div className="text-center col-span-full mt-6 text-gray-500">
          No properties found matching your search query.
        </div>
      )}
      {!loading && properties.length === 0 && (
        <div className="text-center col-span-full mt-6 text-gray-500">
          No properties available. Add a new property to get started.
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-2 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl p-4 w-full max-w-lg max-h-[90vh] overflow-y-auto my-4">
            <h2 className="text-xl font-semibold mb-3 text-gray-700 border-b pb-2">
              {editingProperty ? "Edit Property" : "Add New Property"}
            </h2>
            <form onSubmit={handleSubmit}>
              {renderFormSection(commonSection.title, commonSection.fields)}
              {additionalSections.map((section) =>
                renderFormSection(section.title, section.fields)
              )}

              <div className="flex justify-end gap-3 mt-4 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); resetForm(); dispatch(clearError()); }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                  {isSubmitting
                    ? 'Submitting...'
                    : (editingProperty ? "Update Property" : "Create Property")
                  }
                </button>
              </div>
              {error && isSubmitting && (
                <p className="text-red-600 text-xs mt-2 text-right">{error.message || 'Submission failed.'}</p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProperty;