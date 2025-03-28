// AdminDashboard.js
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { IoLogOutOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { CSSTransition } from "react-transition-group";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import UserManagement from "../components/UserManagement";
import AdminProperty from "../components/AdminProperty";
import AdminReviews from "../components/AdminReviews";
import BannerContext from "../Context/BannerContext";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { updateBanner } = useContext(BannerContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAll, setSelectedAll] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Dashboard");
  const [newBanner, setNewBanner] = useState("");

  const barChartData = [
    { name: "17 Sun", visitors: 250000 },
    { name: "18 Mon", visitors: 50000 },
    { name: "19 Tue", visitors: 10000 },
    { name: "20 Wed", visitors: 2000 },
    { name: "21 Thu", visitors: 0 },
    { name: "22 Fri", visitors: 0 },
    { name: "23 Sat", visitors: 0 },
  ];

  const pieChartData = [
    { name: "Gurugram", value: 52.1 },
    { name: "Delhi", value: 22.8 },
    { name: "Noida", value: 13.9 },
    { name: "Faridabad", value: 11.2 },
  ];

  const handleUpdate = () => {
    if (newBanner) {
      updateBanner(newBanner);
      setNewBanner("");
    }
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const renderContent = () => {
    switch (selectedTab) {
      case "Dashboard":
        return (
          <div>
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold">Total Properties</h2>
                <p className="text-2xl font-bold">450</p>
                <p className="text-green-500">Increase</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold">Active Properties</h2>
                <p className="text-2xl font-bold">300</p>
                <p className="text-red-500">Decrease</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold">Pending Properties</h2>
                <p className="text-2xl font-bold">50</p>
                <p className="text-green-500">Increase</p>
              </div>
              {/* Banner section */}
              <div className="p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-xl font-bold mb-4">Update Banner</h2>
                <input
                  type="text"
                  placeholder="Enter new banner URL"
                  value={newBanner}
                  onChange={(e) => setNewBanner(e.target.value)}
                  className="border p-2 w-full rounded mb-3"
                />
                <button
                  onClick={handleUpdate}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Update Banner
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-lg shadow-xl">
                <h2 className="text-lg font-semibold mb-4">Total Visitors</h2>
                <p className="text-4xl font-bold animate-pulse">
                  {barChartData
                    .reduce((acc, item) => acc + item.visitors, 0)
                    .toLocaleString()}
                </p>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={barChartData}>
                    <XAxis dataKey="name" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="visitors"
                      fill="#00C49F"
                      radius={[10, 10, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold mb-4">
                  Traffic by Location
                </h2>
                <ResponsiveContainer width="100%" height={320}>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      innerRadius={40} // Donut Shape
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(1)}%`
                      }
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        color: "#333",
                        backgroundColor: "#fff",
                        borderRadius: "5px",
                      }}
                    />
                    <Legend
                      verticalAlign="bottom"
                      align="center"
                      iconType="circle"
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );

      case "Property":
        return <AdminProperty />;

      case "User":
        return <UserManagement />;

      case "Reviews":
        return <AdminReviews />;

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-blue-900 text-white p-6 fixed h-full">
        <div className="flex items-center space-x-2 mt-[-10px]">
          <img
            onClick={() => navigate("/")}
            src="/logo.png"
            alt="Logo"
            className="h-10 w-32 cursor-pointer"
          />
        </div>
        <nav className="space-y-4">
          {["Dashboard", "Property", "User", "Reviews"].map((item) => (
            <button
              key={item}
              onClick={() => setSelectedTab(item)}
              className={`w-full text-left p-3 flex items-center gap-2 hover:bg-blue-700 rounded-lg transition ${
                selectedTab === item ? "bg-blue-700" : ""
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-8 ml-64">{renderContent()}</main>
    </div>
  );
};

export default AdminDashboard;
