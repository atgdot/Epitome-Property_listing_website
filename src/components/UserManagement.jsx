import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const usersData = Array(8).fill({
  id: Math.random(),
  name: "Aisha Aremu",
  email: "femi@gmail.com",
  phone: "08133768472",
  license: "View / Pdf",
  propertyNumber: "#22522525",
  profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
});

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("User");

  const filteredUsers = usersData.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg">
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
              <tr key={user.id} className="border-b hover:bg-gray-100 transition">
                <td className="p-3">
                  <input type="checkbox" className="w-4 h-4" />
                </td>
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={user.profileImage}
                    alt="User"
                    className="w-8 h-8 rounded-full"
                  />
                  {user.name}
                </td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.phone}</td>
                <td className="p-3 text-blue-600 hover:underline cursor-pointer">
                  {user.license}
                </td>
                <td className="p-3">{user.propertyNumber}</td>
                <td className="p-3 flex gap-2">
                  <button className="text-gray-600 hover:text-blue-700">
                    <FiEdit size={18} />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <FiTrash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
