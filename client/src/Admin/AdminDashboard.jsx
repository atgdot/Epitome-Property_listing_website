import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
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
import AdminRecommendation from "../components/AdminRecommendation";
import AdminPhoto from "../components/AdminPhoto";
import BannerManagement from "../components/BannerManagement";
import LogoutButton from "./LogoutButton";
import { FiMenu } from "react-icons/fi";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.adminAuth);
  const [selectedTab, setSelectedTab] = useState("Dashboard");
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin-login");
    } else {
      setIsLoading(false);
    }
  }, [navigate, isAuthenticated]);

  // Handle window resize for mobile detection
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarCollapsed(true);
      } else {
        setIsSidebarCollapsed(false);
      }
    };

    handleResize(); // Call initially
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        innerRadius={40}
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
              {/* Banner section */}
              <div className="lg:col-span-2">
                <BannerManagement />
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
      case "Recommendations":
        return <AdminRecommendation />;
      case "Photo":
        return <AdminPhoto />;

      default:
        return null;
    }
  };

  // Updated navigation items to include "PropertydetailPhotos"
  const navItems = [
    "Dashboard",
    "Property",
    "User",
    "Reviews",
    "Recommendations",
    "Photo",
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-3 right-4 z-50 bg-blue-900 text-white p-2 rounded-lg"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <FiMenu size={24} />
      </button>
      {/* Sidebar */}
      <aside
        className={`${isSidebarCollapsed ? "w-[200px] md:w-64" : "w-[200px] md:w-64"
          } 
    bg-blue-900 text-white p-4 md:p-6 fixed h-[650px] md:h-full transition-all duration-300
    ${isMobileMenuOpen ? "left-0" : "-left-full md:left-0"} z-40`}
      >
        <div className="flex items-center space-x-2 mt-[-10px]">
          <img
            onClick={() => navigate("/")}
            src="/logo.png"
            alt="Logo"
            className="h-10 w-32 cursor-pointer"
          />
        </div>
        <nav className="space-y-4 mt-6">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => {
                setSelectedTab(item);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left p-3 flex items-center gap-2 hover:bg-blue-700 rounded-lg transition ${selectedTab === item ? "bg-blue-700" : ""
                }`}
            >
              {item}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-8 left-0 right-0 px-6">
          <LogoutButton />
        </div>
      </aside>

      {/* Main content */}
      <main
        className={`flex-1 p-4 md:p-8 transition-all duration-300 ${isSidebarCollapsed ? "ml-0 md:ml-64" : "ml-64"
          }`}
      >
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;
