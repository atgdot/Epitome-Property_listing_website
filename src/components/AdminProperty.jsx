import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { FiFilter } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";

const AdminProperty = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAll, setSelectedAll] = useState(false);
  const [properties, setProperties] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [formData, setFormData] = useState({
    category: "OFFICES",
    city: "",
    status: "",
    title: "",
    details: "",
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

  // Load properties from localStorage on mount
  useEffect(() => {
    const storedProperties = localStorage.getItem("properties");
    if (storedProperties) {
      setProperties(JSON.parse(storedProperties));
    }
  }, []);

  // Save properties to localStorage when properties change
  useEffect(() => {
    localStorage.setItem("properties", JSON.stringify(properties));
  }, [properties]);

  // Filter properties based on search query.
  const filteredProperties = properties.filter((property) =>
    Object.values(property).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

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
      setProperties(
        properties.map((prop) =>
          prop.id === editingProperty.id ? newProperty : prop
        )
      );
    } else {
      setProperties([...properties, newProperty]);
    }

    setShowModal(false);
    setFormData({
      category: "OFFICES",
      city: "",
      status: "",
      title: "",
      details: "",
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

  // Delete a property by id.
  const handleDelete = (id) => {
    setProperties(properties.filter((property) => property.id !== id));
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
      setFormData({
        category: "OFFICES",
        city: "",
        status: "",
        title: "",
        details: "",
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
    }
    setShowModal(true);
  };

  const title = "Properties";

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
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={selectedAll}
              onChange={() => setSelectedAll(!selectedAll)}
              className="w-4 h-4"
            />
            <span className="ml-2">Select All</span>
          </label>
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
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    City
                  </label>
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
                  <label className="block text-sm font-medium mb-1">
                    Status
                  </label>
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
                  <label className="block text-sm font-medium mb-1">
                    Title
                  </label>
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
                    Details
                  </label>
                  <textarea
                    className="w-full p-2 border rounded"
                    placeholder="Additional details about the property"
                    value={formData.details}
                    onChange={(e) =>
                      setFormData({ ...formData, details: e.target.value })
                    }
                    rows="3"
                  ></textarea>
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
              </div>

              {/* Right Column */}
              <div className="space-y-4">
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
                      setFormData({
                        ...formData,
                        currentRental: e.target.value
                      })
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
      <div className="my-8">
        <h2 className="text-3xl font-semibold text-center mb-6">{title}</h2>
        <CSSTransition in={true} timeout={500} classNames="fade" unmountOnExit>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border-2 border-gray-200 p-5 shadow-lg"
              >
                {/* Header Section */}
                <div className="mb-4">
                  <div className="flex justify-between items-center font-bold">
                    <span className="text-[#043268]">{property.category}</span>
                    <span className="text-gray-600">{property.city}</span>
                  </div>
                  <div className="h-[2px] bg-gray-300 my-2"></div>
                </div>

                {/* Property Image */}
                <div className="mb-4">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-48 object-cover rounded-xl"
                  />
                </div>

                {/* Status */}
                <div className="text-sm font-semibold text-[#043268] mb-2">
                  {property.status}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-2">{property.title}</h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {property.description}
                </p>

                {/* Details */}
                {property.details && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    <strong>Details: </strong>
                    {property.details}
                  </p>
                )}

                {/* Price and Rental Yield */}
                <div className="flex justify-between items-start mb-4">
                  <div className="text-[17px] font-bold">{property.price}</div>
                  <div className="text-right">
                    <div className="text-[13px] text-gray-600 font-medium">
                      Avg. Rental Yield:{" "}
                      <span className="text-[17px] font-bold text-[#043268]">
                        {property.rentalYield}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bullet Points */}
                <ul className="space-y-2 mb-4">
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-600">Area:</span>
                    <span>{property.area}</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-600">Current Rental:</span>
                    <span>{property.currentRental}</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-600">Tenure:</span>
                    <span>{property.tenure}</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-600">Tenant:</span>
                    <span>{property.tenant}</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-600">Location:</span>
                    <span>{property.sector}</span>
                  </li>
                </ul>

                {/* Edit and Delete Buttons */}
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => openEditModal(property)}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                  >
                    <MdEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(property.id)}
                    className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                  >
                    <MdDelete /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};

export default AdminProperty;
