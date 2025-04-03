import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { 
  createUser, 
  getAllUsers, 
  updateUser, 
  deleteUser,
  searchUserByName,
  clearErrors
} from "../utils/Store/slice/userSlice";
import { 
  createAgent, 
  getAllAgents, 
  updateAgent, 
  deleteAgent 
} from "../utils/Store/slice/agentSlice";

const UserManagement = () => {
  const dispatch = useDispatch();
  
  // Get state from Redux store
  const { users, loading: userLoading, error: userError } = useSelector(state => state.user);
  const { agents, loading: agentLoading, error: agentError } = useSelector(state => state.agent);
  
  // Local UI state
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("User");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  
  // Form data defaults
  const initialFormState = {
    name: "",
    email: "",
    phone: "",
    license: null,
    propertyNumber: "",
    profileImage: null,
  };
  const [formData, setFormData] = useState(initialFormState);

  // Load data on component mount and tab change
  useEffect(() => {
    // Clear any previous errors
    dispatch(clearErrors());
    
    // Reset selected items when changing tabs
    setSelectedItems([]);
    
    // Fetch data
    fetchAllData();
  }, [activeTab]); // Only fetch when activeTab changes or on mount

  // Separate fetch functions for better control
  const fetchAllData = () => {
    if (activeTab === "User") {
      fetchUsers();
    } else {
      fetchAgents();
    }
  };

  const fetchUsers = () => {
    dispatch(getAllUsers())
      .unwrap()
      .then(data => {
        console.log('Users fetched successfully:', data);
      })
      .catch(err => {
        console.error('Failed to load users:', err);
      });
  };

  const fetchAgents = () => {
    dispatch(getAllAgents())
      .unwrap()
      .then(data => {
        console.log('Agents fetched successfully:', data);
      })
      .catch(err => {
        console.error('Failed to load agents:', err);
      });
  };

  // Ensure items is always an array
  const items = activeTab === "User" 
    ? (Array.isArray(users) ? users : []) 
    : (Array.isArray(agents) ? agents : []);
  
  const loading = activeTab === "User" ? userLoading : agentLoading;
  const error = activeTab === "User" ? userError : agentError;

  // Filter items based on search query
  const filteredItems = items.filter(item => 
    item && item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle search
  const handleSearch = () => {
    if (activeTab === "User" && searchQuery.trim()) {
      dispatch(searchUserByName(searchQuery));
    } else if (activeTab === "User") {
      // If search query is empty, get all users
      dispatch(getAllUsers());
    } else if (activeTab === "Agent") {
      // For agents, we're doing local filtering since there's no specific API
      dispatch(getAllAgents());
    }
  };

  // Handle adding a new user/agent
  const handleAdd = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    
    // Append text fields
    Object.keys(formData).forEach(key => {
      if (key !== 'license' && key !== 'profileImage') {
        formDataToSubmit.append(key, formData[key]);
      }
    });
    
    // Append files if they exist
    if (formData.license) {
      formDataToSubmit.append('license', formData.license);
    }
    
    if (formData.profileImage) {
      formDataToSubmit.append('profileImage', formData.profileImage);
    }

    try {
      if (activeTab === "User") {
        await dispatch(createUser(formDataToSubmit)).unwrap();
        // Refresh the list after adding
        fetchUsers();
      } else {
        await dispatch(createAgent(formDataToSubmit)).unwrap();
        // Refresh the list after adding
        fetchAgents();
      }
      setFormData(initialFormState);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error(`Error creating ${activeTab.toLowerCase()}:`, error);
    }
  };

  // Handle editing an existing user/agent
  const handleEdit = async (e) => {
    e.preventDefault();
    
    const formDataToSubmit = new FormData();
    
    // Append text fields
    Object.keys(formData).forEach(key => {
      if (key !== 'license' && key !== 'profileImage') {
        formDataToSubmit.append(key, formData[key]);
      }
    });
    
    // Append files only if they are new files (not strings)
    if (formData.license && typeof formData.license !== 'string') {
      formDataToSubmit.append('license', formData.license);
    }
    
    if (formData.profileImage && typeof formData.profileImage !== 'string') {
      formDataToSubmit.append('profileImage', formData.profileImage);
    }

    try {
      if (activeTab === "User") {
        await dispatch(updateUser({ 
          id: editingItem._id, 
          userData: formDataToSubmit 
        })).unwrap();
        // Refresh the list after updating
        fetchUsers();
      } else {
        await dispatch(updateAgent({ 
          id: editingItem._id, 
          agentData: formDataToSubmit 
        })).unwrap();
        // Refresh the list after updating
        fetchAgents();
      }
      setEditingItem(null);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error(`Error updating ${activeTab.toLowerCase()}:`, error);
    }
  };

  // Open the edit modal with the selected item's data
  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name || "",
      email: item.email || "",
      phone: item.phone || "",
      license: item.license || null,
      propertyNumber: item.propertyNumber || "",
      profileImage: item.profileImage || null,
    });
    setIsEditModalOpen(true);
  };

  // Handle deletion of a user/agent
  const handleDelete = async (id) => {
    try {
      if (activeTab === "User") {
        await dispatch(deleteUser(id)).unwrap();
        // Refresh the list after deleting
        fetchUsers();
      } else {
        await dispatch(deleteAgent(id)).unwrap();
        // Refresh the list after deleting
        fetchAgents();
      }
      // Remove the deleted item from selected items
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } catch (error) {
      console.error(`Error deleting ${activeTab.toLowerCase()}:`, error);
    }
  };

  // Handle file change for license input
  const handleLicenseFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, license: e.target.files[0] });
    }
  };

  // Handle file change for profile image input
  const handleProfileImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, profileImage: e.target.files[0] });
    }
  };

  // Handle checkbox selection
  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  // Handle select all checkbox
  const handleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems.map(item => item._id));
    }
  };

  // Handle bulk delete
  const handleBulkDelete = async () => {
    if (selectedItems.length === 0) return;
    
    const confirmDelete = window.confirm(`Are you sure you want to delete ${selectedItems.length} ${activeTab.toLowerCase()}(s)?`);
    if (!confirmDelete) return;
    
    try {
      // Process deletions sequentially to avoid race conditions
      for (const id of selectedItems) {
        if (activeTab === "User") {
          await dispatch(deleteUser(id)).unwrap();
        } else {
          await dispatch(deleteAgent(id)).unwrap();
        }
      }
      
      // Refresh the data after all deletions
      fetchAllData();
      
      setSelectedItems([]);
    } catch (error) {
      console.error(`Error with bulk delete:`, error);
    }
  };

  // Handle pressing enter in search box
  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">User & Agent Management</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === "User"
              ? "bg-blue-700 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setActiveTab("User")}
        >
          User
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === "Agent"
              ? "bg-blue-700 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setActiveTab("Agent")}
        >
          Agent
        </button>
      </div>

      {/* Search & Buttons */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex border rounded-lg bg-white w-80 overflow-hidden">
          <input
            type="text"
            placeholder={`Search ${activeTab}s...`}
            className="px-4 py-2 w-full outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
          />
          <button 
            className="px-4 py-2 bg-blue-700 text-white flex items-center"
            onClick={handleSearch}
          >
            <FaSearch />
          </button>
        </div>

        <div className="flex gap-4">
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg"
            onClick={() => {
              setFormData(initialFormState);
              setIsAddModalOpen(true);
            }}
          >
            Add +
          </button>
          <button 
            className={`px-6 py-2 rounded-lg ${
              selectedItems.length === 1
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            onClick={() => {
              if (selectedItems.length === 1) {
                const selectedItem = filteredItems.find(item => item._id === selectedItems[0]);
                if (selectedItem) {
                  openEditModal(selectedItem);
                }
              }
            }}
            disabled={selectedItems.length !== 1}
          >
            Edit ✎
          </button>
          
          {selectedItems.length > 0 && (
            <button 
              className="px-6 py-2 bg-red-600 text-white rounded-lg"
              onClick={handleBulkDelete}
            >
              Delete Selected
            </button>
          )}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error.message || "An error occurred. Please try again."}
        </div>
      )}

      {/* Debug Info - Only visible in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded mb-4">
          <strong>Debug:</strong> {activeTab} count: {items.length} | 
          Redux state: {JSON.stringify(items.length)}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* No items message when not loading and no items found */}
      {!loading && items.length === 0 && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
          No {activeTab.toLowerCase()}s found. Add a new {activeTab.toLowerCase()} using the "Add +" button or check your API connection.
        </div>
      )}

      {/* Table - Only show when not loading and items exist */}
      {!loading && items.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow-lg overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-green-100">
              <tr>
                <th className="p-3">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4"
                    checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="p-3">Name</th>
                <th className="p-3">Email Address</th>
                <th className="p-3">Phone</th>
                <th className="p-3">License</th>
                <th className="p-3">Property Number</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-4 text-center text-gray-500">
                    No {activeTab.toLowerCase()}s match your search criteria
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b hover:bg-gray-100 transition"
                  >
                    <td className="p-3">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4"
                        checked={selectedItems.includes(item._id)}
                        onChange={() => handleSelectItem(item._id)}
                      />
                    </td>
                    <td className="p-3 flex items-center gap-3">
                      {item.profileImage ? (
                        <img
                          src={item.profileImage}
                          alt={item.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-500">
                          {item.name?.charAt(0).toUpperCase() || '?'}
                        </div>
                      )}
                      {item.name}
                    </td>
                    <td className="p-3">{item.email}</td>
                    <td className="p-3">{item.phone}</td>
                    <td className="p-3">
                      {item.license ? (
                        <a
                          href={item.license}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline cursor-pointer"
                        >
                          View
                        </a>
                      ) : (
                        "Not provided"
                      )}
                    </td>
                    <td className="p-3">{item.propertyNumber || "N/A"}</td>
                    <td className="p-3 flex gap-2">
                      <button
                        className="text-gray-600 hover:text-blue-700"
                        onClick={() => openEditModal(item)}
                        title="Edit"
                      >
                        <FiEdit size={18} />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(item._id)}
                        title="Delete"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Add {activeTab}</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block mb-1">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Phone</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block mb-1">License (PDF)</label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleLicenseFileChange}
                  className="w-full border p-2"
                />
              </div>
              <div>
                <label className="block mb-1">Property Number</label>
                <input
                  type="text"
                  value={formData.propertyNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      propertyNumber: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block mb-1">Profile Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                  className="w-full border p-2"
                />
              </div>
              <div className="flex justify-end gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Edit {activeTab}</h2>
            <form onSubmit={handleEdit} className="space-y-4">
              <div>
                <label className="block mb-1">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Phone</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block mb-1">License (PDF)</label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleLicenseFileChange}
                  className="w-full border p-2"
                />
                {formData.license && typeof formData.license === "string" && (
                  <a
                    href={formData.license}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline cursor-pointer text-sm"
                  >
                    View current license
                  </a>
                )}
              </div>
              <div>
                <label className="block mb-1">Property Number</label>
                <input
                  type="text"
                  value={formData.propertyNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      propertyNumber: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block mb-1">Profile Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                  className="w-full border p-2"
                />
                {formData.profileImage && typeof formData.profileImage === "string" && (
                  <div>
                    <img
                      src={formData.profileImage}
                      alt="Profile Preview"
                      className="mt-2 w-16 h-16 rounded-full object-cover"
                    />
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;