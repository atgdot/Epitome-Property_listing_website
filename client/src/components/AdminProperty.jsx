import React, { useState, useContext } from "react";
import { CSSTransition } from "react-transition-group";
import { FiFilter } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import PropertyCard from "./PropertyCard";
import HighRiseCard from "./HighRiseCard";
import PropertyContext from "../Context/PropertycardContext";
import { useDispatch } from "react-redux";
import { createProperty, updateProperty } from '../utils/Store/slice/propertySlice';

const AdminProperty = () => {
  const { properties, addProperty, updateProperty, deleteProperty } =
    useContext(PropertyContext);
  const dispatch = useDispatch()
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
    sector: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle image uploads
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // When category is changed, update subCategory accordingly
  const handleCategoryChange = (newCategory) => {
    let newSubCategory = "";
    if (newCategory === "residential") {
      newSubCategory = "luxuryProjects";
    } else if (newCategory === "commercial") {
      newSubCategory = "offices";
    }
    setFormData((prev) => ({
      ...prev,
      category: newCategory,
      subCategory: newSubCategory
    }));
  };

  // Reset the form to its initial state
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
      sector: ""
    });
    setEditingProperty(null);
  };

  // Submit handler for both adding and updating properties
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create the property object, excluding image if it's empty
    const newProperty = {
      ...formData,
      price: formData.price.startsWith("₹")
        ? formData.price
        : `₹ ${formData.price}`,
      currentRental: formData.currentRental.startsWith("₹")
        ? formData.currentRental
        : `₹ ${formData.currentRental}`,
      id: editingProperty?.id || Math.random()
    };

    // Remove image property if it's empty
    if (!newProperty.image) {
      delete newProperty.image;
    }

    try {
      if (editingProperty) {
        const updateResult = await dispatch(updateProperty({
          id: editingProperty.id,
          propertyData: newProperty
        })).unwrap();

        if (updateResult) {
          updateProperty(updateResult);
        }
      } else {
        const createResult = await dispatch(createProperty(newProperty)).unwrap();
        if (createResult) {
          addProperty(createResult);
        } else {
          throw new Error('Failed to create property');
        }
      }

      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error submitting property:', error);
      alert(error.message || 'Failed to submit property. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Open modal for editing or adding a property
  const openEditModal = (property = null) => {
    setEditingProperty(property);
    if (property) {
      setFormData({
        ...property,
        price: property.price.replace("₹ ", ""),
        currentRental: property.currentRental.replace("₹ ", "")
      });
    } else {
      resetForm();
    }
    setShowModal(true);
  };

  const handleDelete = (id) => {
    deleteProperty(id);
  };

  // Flatten properties and enable searching
  const flattenedProperties = Object.values(properties)
    .flatMap((category) =>
      Array.isArray(category) ? category : Object.values(category).flat()
    )
    .filter((property) =>
      Object.values(property).some((val) =>
        val.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

  // Render a section of the form based on a given title and list of fields.
  const renderFormSection = (title, fields) => (
    <div className="md:col-span-2 border-t pt-1 mt-1" key={title}>
      <h3 className="text-base font-semibold mb-1 text-[#043268]">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
        {fields.map((field) => (
          <div key={field.name}>
            <label className="block text-xs font-medium mb-1">
              {field.label}
            </label>
            {field.type === "select" ? (
              <select
                className="w-full p-1 border rounded text-xs"
                value={formData[field.name]}
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
                type="file"
                onChange={handleImageChange}
                className="w-full p-1 border rounded text-xs"
                accept="image/*"
                required={field.required}
              />
            ) : field.type === "textarea" ? (
              <textarea
                className="w-full p-1 border rounded text-xs"
                value={formData[field.name]}
                onChange={(e) =>
                  setFormData({ ...formData, [field.name]: e.target.value })
                }
                placeholder={field.placeholder}
                rows="2"
                required={field.required}
              ></textarea>
            ) : (
              <input
                type={field.type || "text"}
                className="w-full p-1 border rounded text-xs"
                placeholder={field.placeholder}
                value={formData[field.name]}
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

  // Common section: Category and Sub Category always appear.
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
            : [
              { value: "offices", label: "Offices" },
              { value: "preLeasedOffices", label: "Pre-Leased Offices" },
              { value: "preRented", label: "Pre-Rented" },
              { value: "sco", label: "SCO" }
            ],
        required: true
      }
    ]
  };

  // For residential properties, only show these essential fields.
  const residentialFormSections = [
    {
      title: "Residential Details",
      fields: [
        { name: "title", label: "Title", required: true },
        { name: "city", label: "City", required: true },
        { name: "sector", label: "Location", required: true },
        {
          name: "price",
          label: "Price (₹)",
          placeholder: "e.g., 4.86 - 8 Cr",
          required: true
        },
        {
          name: "image",
          label: "Property Image (Optional)",
          type: "file",
          required: false  // Made optional
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

  // For non-residential properties, show a more detailed form.
  const nonResidentialFormSections = [
    {
      title: "Non-Residential Details",
      fields: [
        { name: "city", label: "City", required: true },
        { name: "status", label: "Status", required: true },
        { name: "title", label: "Title", required: true },
        {
          name: "image",
          label: "Property Image (Optional)",
          type: "file",
          required: false  // Made optional
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
          placeholder: "e.g., 4.86 - 8 Cr"
        },
        {
          name: "rentalYield",
          label: "Rental Yield",
          placeholder: "e.g., 5.2%"
        },
        {
          name: "currentRental",
          label: "Current Rental (₹)",
          placeholder: "e.g., 2.6 Lakh/month"
        }
      ]
    },
    {
      title: "Property Details",
      fields: [
        { name: "area", label: "Area", placeholder: "e.g., 3,500 sqft" },
        { name: "tenure", label: "Tenure" },
        { name: "tenant", label: "Tenant" },
        { name: "sector", label: "Location" }
      ]
    }
  ];

  // Decide which sections to show (excluding the common section) based on category.
  const additionalSections =
    formData.category === "residential"
      ? residentialFormSections
      : nonResidentialFormSections;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Admin Property Management
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <button className="flex items-center px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
          <FiFilter className="mr-2" /> Filter
        </button>

        <div className="flex border rounded-lg bg-white w-full md:w-80 overflow-hidden">
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-2 w-full outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="px-4 py-2 bg-blue-700 text-white flex items-center">
            <FaSearch />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => openEditModal()}
            className="flex items-center gap-1 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            <MdEdit /> Add New
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 z-50">
          <div className="bg-white rounded-2xl p-2 w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-2">
              {editingProperty ? "Edit Property" : "Add New Property"}
            </h2>
            <form onSubmit={handleSubmit}>
              {/* Always render common section */}
              {renderFormSection(commonSection.title, commonSection.fields)}
              {/* Then conditionally render additional sections */}
              {additionalSections.map((section) =>
                renderFormSection(section.title, section.fields)
              )}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-1 bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-1 bg-blue-700 text-white rounded-lg disabled:bg-blue-300"
                >
                  {isSubmitting
                    ? 'Submitting...'
                    : (editingProperty ? "Update" : "Create")
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <CSSTransition in={true} timeout={500} classNames="fade" unmountOnExit>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flattenedProperties.map((property, index) =>
            property.category === "residential" ? (
              <HighRiseCard
                key={index}
                property={property}
                editable={true}
                onEdit={() => openEditModal(property)}
                onDelete={() => handleDelete(property.id)}
              />
            ) : (
              <PropertyCard
                key={index}
                property={property}
                editable={true}
                onEdit={() => openEditModal(property)}
                onDelete={() => handleDelete(property.id)}
              />
            )
          )}
        </div>
      </CSSTransition>
    </div>
  );
};

export default AdminProperty;
