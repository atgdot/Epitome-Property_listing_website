import React, { useState, useContext } from "react";
import { CSSTransition } from "react-transition-group";
import { FiFilter } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import PropertyCard from "./PropertyCard";
import PropertyContext from "../Context/PropertyContext";

const AdminProperty = () => {
  const { properties, addProperty, updateProperty, deleteProperty } =
    useContext(PropertyContext);
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

  // Handle image file input and convert it to a base64 string.
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

  // Update category and its respective sub-category.
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

  // Submit handler for add and update property operations.
  const handleSubmit = (e) => {
    e.preventDefault();
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

    if (editingProperty) {
      updateProperty(newProperty);
    } else {
      addProperty(newProperty);
    }

    // The property is saved in the context so it will immediately show up on this page.
    setShowModal(false);
    resetForm();
  };

  // Open modal for editing or adding a property.
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

  // Handler to delete a property.
  const handleDelete = (id) => {
    deleteProperty(id);
  };

  // Flatten all properties from the context into an array.
  const flattenedProperties = Object.values(properties)
    .flatMap((category) =>
      Array.isArray(category)
        ? category
        : Object.values(category).flat()
    )
    .filter((property) =>
      Object.values(property).some((val) =>
        val.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

  return (
    <div>
      <h1 className="text-3xl font-semibold text-center mb-6">
        Admin Property Management
      </h1>

      {/* Search and Filter Section */}
      <div className="flex justify-between items-center mb-6">
        <button className="flex items-center px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
          <FiFilter className="mr-2" /> Filter
        </button>

        <div className="flex border rounded-lg bg-white w-80 overflow-hidden">
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

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">
              {editingProperty ? "Edit Property" : "Add New Property"}
            </h2>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <label className="block text-sm font-medium mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="residential">RESIDENTIAL</option>
                  <option value="commercial">Commercial</option>
                  <option value="trending">Trending</option>
                  <option value="featured">Featured</option>
                </select>
              </div>

              {["residential", "commercial"].includes(formData.category) && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Sub Category
                  </label>
                  <select
                    value={formData.subCategory}
                    onChange={(e) =>
                      setFormData({ ...formData, subCategory: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                  >
                    {formData.category === "residential" ? (
                      <>
                        <option value="luxuryProjects">Luxury Projects</option>
                        <option value="upcomingProjects">Upcoming Projects</option>
                        <option value="highRiseApartments">
                          High Rise Apartments
                        </option>
                      </>
                    ) : (
                      <>
                        <option value="offices">Offices</option>
                        <option value="preLeasedOffices">Pre-Leased Offices</option>
                        <option value="preRented">Pre-Rented</option>
                        <option value="sco">SCO</option>
                      </>
                    )}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  className="w-full p-2 border rounded"
                  placeholder="Short description of the property"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows="3"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Price (₹)
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="e.g., 4.86 - 8 Cr"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Rental Yield
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="e.g., 5.2%"
                  value={formData.rentalYield}
                  onChange={(e) =>
                    setFormData({ ...formData, rentalYield: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Area
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="e.g., 3,500 sqft"
                  value={formData.area}
                  onChange={(e) =>
                    setFormData({ ...formData, area: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Current Rental (₹)
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="e.g., 2.6 Lakh/month"
                  value={formData.currentRental}
                  onChange={(e) =>
                    setFormData({ ...formData, currentRental: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Tenure
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={formData.tenure}
                  onChange={(e) =>
                    setFormData({ ...formData, tenure: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Tenant
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={formData.tenant}
                  onChange={(e) =>
                    setFormData({ ...formData, tenant: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Location
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={formData.sector}
                  onChange={(e) =>
                    setFormData({ ...formData, sector: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Property Image
                </label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="w-full p-2 border rounded"
                  accept="image/*"
                />
              </div>

              <div className="md:col-span-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-700 text-white rounded-lg"
                >
                  {editingProperty ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Property Container */}
      <CSSTransition in={true} timeout={500} classNames="fade" unmountOnExit>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flattenedProperties.map((property, index) => (
            <PropertyCard
              key={index}
              property={property}
              editable={true}
              onEdit={() => openEditModal(property)}
              onDelete={() => handleDelete(property.id)}
            />
          ))}
        </div>
      </CSSTransition>
    </div>
  );
};

export default AdminProperty;
