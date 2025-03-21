import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const UserManagement = () => {
  // State for storing users/agents (each has a type: "User" or "Agent")
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("User");

  // Modal states and form data
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Form data defaults; name now starts as empty.
  const initialFormState = {
    name: "",
    email: "",
    phone: "",
    license: null, // file or URL string
    propertyNumber: "",
    profileImage: null, // file or URL string
    type: activeTab, // "User" or "Agent"
  };
  const [formData, setFormData] = useState(initialFormState);

  // Filter users based on tab and search query
  const filteredUsers = users.filter(
    (user) =>
      user.type === activeTab &&
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle adding a new user/agent
  const handleAddUser = (e) => {
    e.preventDefault();
    const newUser = { ...formData, id: Date.now() };

    // Convert license file to object URL if needed
    if (formData.license && typeof formData.license !== "string") {
      newUser.license = URL.createObjectURL(formData.license);
    }
    // Convert profile image file to object URL if needed
    if (formData.profileImage && typeof formData.profileImage !== "string") {
      newUser.profileImage = URL.createObjectURL(formData.profileImage);
    }
    setUsers([...users, newUser]);
    setFormData(initialFormState);
    setIsAddModalOpen(false);
  };

  // Handle editing an existing user/agent
  const handleEditUser = (e) => {
    e.preventDefault();
    const updatedUsers = users.map((u) => {
      if (u.id === editingUser.id) {
        let updatedLicense = formData.license;
        if (formData.license && typeof formData.license !== "string") {
          updatedLicense = URL.createObjectURL(formData.license);
        }
        let updatedProfileImage = formData.profileImage;
        if (
          formData.profileImage &&
          typeof formData.profileImage !== "string"
        ) {
          updatedProfileImage = URL.createObjectURL(formData.profileImage);
        }
        return {
          ...editingUser,
          ...formData,
          license: updatedLicense,
          profileImage: updatedProfileImage,
        };
      }
      return u;
    });
    setUsers(updatedUsers);
    setEditingUser(null);
    setIsEditModalOpen(false);
  };

  // Open the edit modal and prefill the form with the selected user's data
  const openEditModal = (user) => {
    setEditingUser(user);
    setFormData(user);
    setIsEditModalOpen(true);
  };

  // Handle deletion of a user/agent
  const handleDeleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
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
            placeholder="Search Users..."
            className="px-4 py-2 w-full outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="px-4 py-2 bg-blue-700 text-white flex items-center">
            <FaSearch />
          </button>
        </div>

        <div className="flex gap-4">
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg"
            onClick={() => {
              // Reset form with default values and set the type to the current active tab
              setFormData({ ...initialFormState, type: activeTab });
              setIsAddModalOpen(true);
            }}
          >
            Add +
          </button>
          <button className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg">
            Edit ✎
          </button>
        </div>
      </div>

      {/* User Table */}
      <div className="bg-white p-4 rounded-lg shadow-lg overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-green-100">
            <tr>
              <th className="p-3">
                <input type="checkbox" className="w-4 h-4" />
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
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b hover:bg-gray-100 transition"
              >
                <td className="p-3">
                  <input type="checkbox" className="w-4 h-4" />
                </td>
                <td className="p-3 flex items-center gap-3">
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt="User"
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-300" />
                  )}
                  {user.name}
                </td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.phone}</td>
                <td className="p-3">
                  {user.license ? (
                    <div className="flex items-center gap-2">
                      <a
                        href={user.license}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline cursor-pointer"
                      >
                        View
                      </a>
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          const updatedUsers = users.map((u) => {
                            if (u.id === user.id) {
                              return {
                                ...u,
                                license: file
                                  ? URL.createObjectURL(file)
                                  : null,
                              };
                            }
                            return u;
                          });
                          setUsers(updatedUsers);
                        }}
                        className="hidden"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          const updatedUsers = users.map((u) => {
                            if (u.id === user.id) {
                              return {
                                ...u,
                                license: file
                                  ? URL.createObjectURL(file)
                                  : null,
                              };
                            }
                            return u;
                          });
                          setUsers(updatedUsers);
                        }}
                      />
                    </div>
                  )}
                </td>
                <td className="p-3">{user.propertyNumber}</td>
                <td className="p-3 flex gap-2">
                  <button
                    className="text-gray-600 hover:text-blue-700"
                    onClick={() => openEditModal(user)}
                  >
                    <FiEdit size={18} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <FiTrash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add {activeTab}</h2>
            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label>Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label>Phone</label>
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
                <label>License (PDF)</label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleLicenseFileChange}
                  className="w-full"
                />
              </div>
              <div>
                <label>Property Number</label>
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
                <label>Profile Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                  className="w-full"
                />
              </div>
              <div className="flex justify-end gap-4">
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit {activeTab}</h2>
            <form onSubmit={handleEditUser} className="space-y-4">
              <div>
                <label>Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label>Phone</label>
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
                <label>License (PDF)</label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleLicenseFileChange}
                  className="w-full"
                />
                {formData.license &&
                  typeof formData.license === "string" && (
                    <a
                      href={formData.license}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline cursor-pointer"
                    >
                      View
                    </a>
                  )}
              </div>
              <div>
                <label>Property Number</label>
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
                <label>Profile Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                  className="w-full"
                />
                {formData.profileImage &&
                  typeof formData.profileImage === "string" && (
                    <img
                      src={formData.profileImage}
                      alt="Profile Preview"
                      className="mt-2 w-16 h-16 rounded-full object-cover"
                    />
                  )}
              </div>
              <div className="flex justify-end gap-4">
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
