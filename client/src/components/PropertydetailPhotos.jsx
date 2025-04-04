import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const initialFormState = {
  property: "",
  logo_image: [],
  header_images: [],
  about_image: [],
  highlight_image: [],
  gallery_image: [],
  floor_plans: [],
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
  uploadButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  imageRow: {
    display: "flex",
    overflowX: "auto",
    gap: "10px",
    marginTop: "10px",
    paddingBottom: "10px",
  },
  imagePreview: {
    maxWidth: "200px",
    height: "auto",
    borderRadius: "6px",
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
  floorPlanContainer: {
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "4px",
    marginBottom: "10px",
  },
};

const PropertydetailPhotos = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [propertyMediaList, setPropertyMediaList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const fileInputs = useRef({});

  useEffect(() => {
    fetchPropertyMedia();
  }, []);

  const fetchPropertyMedia = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/property-media");
      setPropertyMediaList(res.data);
    } catch (error) {
      console.error("Error fetching property media:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMultipleFileChange = (e, field) => {
    const files = Array.from(e.target.files);
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setFormData({ ...formData, [field]: previewUrls });
  };

  const triggerFileInput = (field) => {
    fileInputs.current[field]?.click();
  };

  const handleFloorPlanChange = (index, field, value, isFile = false) => {
    const updatedFloorPlans = [...formData.floor_plans];
    if (isFile && value) {
      const previewUrl = URL.createObjectURL(value);
      updatedFloorPlans[index][field] = previewUrl;
    } else {
      updatedFloorPlans[index][field] = value;
    }
    setFormData({ ...formData, floor_plans: updatedFloorPlans });
  };

  const handleAddFloorPlan = () => {
    setFormData({
      ...formData,
      floor_plans: [...formData.floor_plans, { description: "", area: 0, image: "" }],
    });
  };

  const handleRemoveFloorPlan = (index) => {
    const updated = [...formData.floor_plans];
    updated.splice(index, 1);
    setFormData({ ...formData, floor_plans: updated });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/property-media", formData);
      setFormData(initialFormState);
      setShowForm(false);
      fetchPropertyMedia();
    } catch (error) {
      console.error("Error adding property media:", error);
    }
  };

  const handleEditClick = (media) => {
    setIsEditing(true);
    setSelectedMedia(media);
    setFormData(media);
    setShowForm(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/property-media/${selectedMedia._id}`, formData);
      setIsEditing(false);
      setSelectedMedia(null);
      setFormData(initialFormState);
      setShowForm(false);
      fetchPropertyMedia();
    } catch (error) {
      console.error("Error updating property media:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/property-media/${id}`);
      if (selectedMedia && selectedMedia._id === id) {
        setIsEditing(false);
        setSelectedMedia(null);
        setFormData(initialFormState);
        setShowForm(false);
      }
      fetchPropertyMedia();
    } catch (error) {
      console.error("Error deleting property media:", error);
    }
  };

  const imageFields = ["logo_image", "header_images", "about_image", "highlight_image", "gallery_image"];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Property Images</h1>
        <button
          style={styles.addBtn}
          onClick={() => {
            if (!isEditing) setFormData(initialFormState);
            setShowForm(!showForm);
          }}
        >
          {showForm ? "Hide Form" : "Add Property Image"}
        </button>
      </div>

      {showForm && (
        <div style={styles.formContainer}>
          <h2>{isEditing ? "Edit Property Images" : "Create New Property Images"}</h2>
          <form onSubmit={isEditing ? handleUpdate : handleAddSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Property (ID):</label>
              <input
                type="text"
                name="property"
                value={formData.property}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Multiple Image Uploads */}
            {imageFields.map((field) => (
              <div key={field} style={styles.formGroup}>
                <label style={styles.label}>{field.replace("_", " ").toUpperCase()}:</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  style={{ display: "none" }}
                  ref={(el) => (fileInputs.current[field] = el)}
                  onChange={(e) => handleMultipleFileChange(e, field)}
                />
                <button type="button" style={styles.uploadButton} onClick={() => triggerFileInput(field)}>
                  Upload Images
                </button>
                <div style={styles.imageRow}>
                  {formData[field]?.map((img, idx) => (
                    <img key={idx} src={img} alt={`${field}-${idx}`} style={styles.imagePreview} />
                  ))}
                </div>
              </div>
            ))}

            {/* Floor Plans */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Floor Plans:</label>
              {formData.floor_plans.map((plan, index) => (
                <div key={index} style={styles.floorPlanContainer}>
                  <input
                    type="text"
                    value={plan.description}
                    placeholder="Description"
                    onChange={(e) => handleFloorPlanChange(index, "description", e.target.value)}
                  />
                  <input
                    type="number"
                    value={plan.area}
                    placeholder="Area"
                    onChange={(e) => handleFloorPlanChange(index, "area", e.target.value)}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      e.target.files[0] && handleFloorPlanChange(index, "image", e.target.files[0], true)
                    }
                  />
                  {plan.image && (
                    <div style={styles.imageRow}>
                      <img src={plan.image} alt="Floor preview" style={styles.imagePreview} />
                    </div>
                  )}
                  <button type="button" style={styles.deleteBtn} onClick={() => handleRemoveFloorPlan(index)}>
                    Remove Floor Plan
                  </button>
                </div>
              ))}
              <button type="button" style={styles.addBtn} onClick={handleAddFloorPlan}>
                Add Floor Plan
              </button>
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
                    setSelectedMedia(null);
                    setFormData(initialFormState);
                    setShowForm(false);
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Display property media cards */}
      {propertyMediaList.length > 0 ? (
        propertyMediaList.map((media) => (
          <div key={media._id} style={{ marginBottom: "30px" }}>
            <h3>{media.property}</h3>
            {imageFields.map((field) => (
              <div key={field}>
                <strong>{field.replace("_", " ").toUpperCase()}:</strong>
                <div style={styles.imageRow}>
                  {(media[field] || []).map((img, idx) => (
                    <img key={idx} src={img} alt={`${field}-${idx}`} style={styles.imagePreview} />
                  ))}
                </div>
              </div>
            ))}
            {media.floor_plans?.map((plan, i) => (
              <div key={i}>
                <p>Description: {plan.description}</p>
                <p>Area: {plan.area}</p>
                {plan.image && (
                  <div style={styles.imageRow}>
                    <img src={plan.image} alt="Floor plan" style={styles.imagePreview} />
                  </div>
                )}
              </div>
            ))}
            <button style={styles.submitBtn} onClick={() => handleEditClick(media)}>
              Edit
            </button>
            <button style={styles.deleteBtn} onClick={() => handleDelete(media._id)}>
              Delete
            </button>
          </div>
        ))
      ) : (
        <p>No property media found.</p>
      )}
    </div>
  );
};

export default PropertydetailPhotos;
