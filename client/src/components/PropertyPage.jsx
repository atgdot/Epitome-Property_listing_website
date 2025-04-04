import React, { useState, useEffect } from "react";
import axios from "axios";

// Initial form state based on propertyLocationSchema
const initialFormState = {
  property: "", // should be the id of a BasicProperty
  city: "",
  location: "",
  address: "",
  pincode: "",
};

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    color: "#333",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  addBtn: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  formContainer: {
    background: "#f9f9f9",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    marginBottom: "40px",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  submitBtn: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "10px",
  },
  deleteBtn: {
    backgroundColor: "#dc3545",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    marginBottom: "20px",
    boxShadow: "0 0 5px rgba(0,0,0,0.05)",
  },
  cardTitle: {
    marginBottom: "10px",
    fontSize: "18px",
    fontWeight: "bold",
  },
};

const PropertyPage = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [propertyLocations, setPropertyLocations] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Fetch all property details on mount
  useEffect(() => {
    fetchPropertyLocations();
  }, []);

  const fetchPropertyLocations = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/property-locations");
      setPropertyLocations(res.data);
    } catch (error) {
      console.error("Error fetching property locations:", error);
    }
  };

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit new property detail
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/property-locations", formData);
      setFormData(initialFormState);
      setShowAddForm(false);
      fetchPropertyLocations();
    } catch (error) {
      console.error("Error adding property detail:", error);
    }
  };

  // Populate form with selected property for editing
  const handleEditClick = (property) => {
    setIsEditing(true);
    setSelectedProperty(property);
    setFormData(property);
    setShowAddForm(true);
  };

  // Update an existing property detail
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/property-locations/${selectedProperty._id}`, formData);
      setIsEditing(false);
      setSelectedProperty(null);
      setFormData(initialFormState);
      setShowAddForm(false);
      fetchPropertyLocations();
    } catch (error) {
      console.error("Error updating property detail:", error);
    }
  };

  // Delete a property detail
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/property-locations/${id}`);
      if (selectedProperty && selectedProperty._id === id) {
        setIsEditing(false);
        setSelectedProperty(null);
        setFormData(initialFormState);
        setShowAddForm(false);
      }
      fetchPropertyLocations();
    } catch (error) {
      console.error("Error deleting property detail:", error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Property Details</h1>
        <button
          style={styles.addBtn}
          onClick={() => {
            if (!isEditing) setFormData(initialFormState);
            setShowAddForm(!showAddForm);
          }}
        >
          {showAddForm ? "Hide Form" : "Add Property Detail"}
        </button>
      </div>

      {showAddForm && (
        <div style={styles.formContainer}>
          <h2>{isEditing ? "Edit Property Detail" : "Create New Property Detail"}</h2>
          <form onSubmit={isEditing ? handleUpdate : handleAddSubmit}>
            <div style={styles.formGroup}>
              <label htmlFor="property" style={styles.label}>
                Property (ID):
              </label>
              <input
                type="text"
                name="property"
                id="property"
                value={formData.property}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="city" style={styles.label}>
                City:
              </label>
              <input
                type="text"
                name="city"
                id="city"
                value={formData.city}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="location" style={styles.label}>
                Location:
              </label>
              <input
                type="text"
                name="location"
                id="location"
                value={formData.location}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="address" style={styles.label}>
                Address:
              </label>
              <input
                type="text"
                name="address"
                id="address"
                value={formData.address}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="pincode" style={styles.label}>
                Pincode:
              </label>
              <input
                type="text"
                name="pincode"
                id="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
            <div>
              <button type="submit" style={styles.submitBtn}>
                {isEditing ? "Update" : "Create"}
              </button>
              {isEditing && (
                <button
                  type="button"
                  style={styles.deleteBtn}
                  onClick={() => {
                    setIsEditing(false);
                    setSelectedProperty(null);
                    setFormData(initialFormState);
                    setShowAddForm(false);
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      <div>
        {propertyLocations.length > 0 ? (
          propertyLocations.map((property) => (
            <div key={property._id} style={styles.card}>
              <div style={styles.cardTitle}>
                {property.property} – {property.city}
              </div>
              <p>
                <strong>Location:</strong> {property.location}
              </p>
              <p>
                <strong>Address:</strong> {property.address}
              </p>
              <p>
                <strong>Pincode:</strong> {property.pincode}
              </p>
              <div>
                <button
                  style={styles.submitBtn}
                  onClick={() => handleEditClick(property)}
                >
                  Edit
                </button>
                <button
                  style={styles.deleteBtn}
                  onClick={() => handleDelete(property._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No property details found.</p>
        )}
      </div>
    </div>
  );
};

export default PropertyPage;
