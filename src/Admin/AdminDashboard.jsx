import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { IoLogOutOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { CSSTransition } from "react-transition-group";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import UserManagement from "../components/UserManagement";



const renderStars = (count) => {
  return [...Array(5)].map((_, i) => (
    <FaStar
      key={i}
      className={`text-${i < count ? 'yellow-400' : 'gray-300'} inline-block`}
    />
  ));
};

const properties = Array.from({length: 9}, () => ({
  id: Math.random(),
  category: "Luxury Apartment",
  city: "New York",
  title: "Signature Global Twin Tower DXP",
  price: "₹ 4.86 - 8 Cr",
  image: "propertyi.png",
  status: "Available",
  description: "A luxurious high-rise offering stunning city views and premium amenities.",
  rentalYield: "5.2%",
  area: "3,500 sqft",
  currentRental: "₹ 2.5 Lakh/month",
  tenure: "Freehold",
  tenant: "Corporate Tenant",
  sector: "Downtown"
}));

const reviews = [
  {
    id: 1,
    author: "Andrew Jones",
    role: "Certified Buyer",
    stars: 4,
    comment:
      "I'm absolutely in love with @gather_place. It's the first video calling software built for people who meet to get work done. Feeling whole lot productive.",
  },
  {
    id: 2,
    author: "Sarah Smith",
    role: "Verified User",
    stars: 5,
    comment:
      "Excellent platform for remote teamwork. The interface is intuitive and features are well thought out.",
  },
  {
    id: 3,
    author: "Mike Johnson",
    role: "Enterprise Customer",
    stars: 4,
    comment:
      "Great solution for our distributed teams. Has significantly improved our meeting productivity.",
  },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAll, setSelectedAll] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Dashboard");

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
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold">Sold Properties</h2>
                <p className="text-2xl font-bold">100</p>
                <p className="text-green-500">Increase</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Total Visitors</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barChartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="visitors" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Traffic by Location</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Property Sold</h2>
              <p className="text-2xl font-bold">45</p>
              <p className="text-gray-600">Monthly: -2.46%</p>
            </div>
          </div>

        );
      case "Property":
        return (
          <div>
            <h1 className="text-3xl font-semibold text-center mb-6">Properties</h1>
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
                <button className="flex items-center gap-1 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
                  <MdEdit /> Edit
                </button>
              </div>
            </div>

            <CSSTransition in={true} timeout={500} classNames="fade" unmountOnExit>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <div key={property.id} className="bg-white rounded-2xl border-2 border-gray-200 p-5 shadow-lg">
                    <div className="mb-4">
                      <div className="flex justify-between items-center font-bold">
                        <span className="text-[#043268]">{property.category}</span>
                        <span className="text-gray-600">{property.city}</span>
                      </div>
                      <div className="h-[2px] bg-gray-300 my-2"></div>
                    </div>

                    <div className="mb-4">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-48 object-cover rounded-xl"
                      />
                    </div>

                    <div className="text-sm font-semibold text-[#043268] mb-2">
                      {property.status}
                    </div>

                    <h3 className="text-xl font-bold mb-2">{property.title}</h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {property.description}
                    </p>

                    <div className="flex justify-between items-start mb-4">
                      <div className="text-[17px] font-bold">{property.price}</div>
                      <div className="text-right">
                        <div className="text-[13px] text-gray-600 font-medium">
                          Avg. Rental Yield: 
                          <span className="text-[17px] font-bold text-[#043268]">
                            {property.rentalYield}
                          </span>
                        </div>
                      </div>
                    </div>

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
                  </div>
                ))}
              </div>
            </CSSTransition>
          </div>
        );
      case "User":
        return <UserManagement />;
      
        
      case "Transactions":
        return (
          <div>
            <h1 className="text-2xl font-bold mb-6">Transactions</h1>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold">Total Balance</h2>
              <p className="text-2xl font-bold">$240,399</p>
              <p className="text-gray-600">Account Type: Debit Card **** **** **** 2598</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg mt-6">
              <h2 className="text-lg font-semibold">All Accounts</h2>
              <p className="text-2xl font-bold">$25,000</p>
              <button className="mt-3 w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition">
                Next
              </button>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg mt-6">
              <h2 className="text-lg font-semibold">Statistics</h2>
              <div className="mt-4">
                <h3 className="text-md font-semibold">Weekly Comparison</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barChartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="visitors" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg mt-6">
              <h2 className="text-lg font-semibold">Goals</h2>
              <p className="text-2xl font-bold">$20,000</p>
              <p className="text-gray-600">Target Achieved: $12,500</p>
              <p className="text-gray-600">This month Target: $20,000</p>
              <div className="mt-4">
                <h3 className="text-md font-semibold">May, 2023</h3>
                <div className="flex justify-between mt-2">
                  <span>$0</span>
                  <span>$0</span>
                  <span>$12K</span>
                </div>
                <p className="text-gray-600">Target vs Achievement</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg mt-6">
              <h2 className="text-lg font-semibold">Recent Transactions</h2>
              <button className="mt-3 w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition">
                View All
              </button>
              <table className="w-full mt-4">
                <thead>
                  <tr>
                    <th className="text-left">Type</th>
                    <th className="text-left">Amount</th>
                    <th className="text-left">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Profit</td>
                    <td>$16,000.00</td>
                    <td>17 May 2023</td>
                  </tr>
                  <tr>
                    <td>Profit</td>
                    <td>$20,000.00</td>
                    <td>17 May 2023</td>
                  </tr>
                  <tr>
                    <td>Salaries</td>
                    <td>$10,000.00</td>
                    <td>17 May 2023</td>
                  </tr>
                  <tr>
                    <td>Rental Property</td>
                    <td>$1,200.00</td>
                    <td>17 May 2023</td>
                  </tr>
                  <tr>
                    <td>Laptops</td>
                    <td>$12,000.00</td>
                    <td>17 May 2023</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        );
       
        case "Reviews":
  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center">User Reviews</h2>

      {/* Total Reviews and Average Rating */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-bold mb-4">Total Reviews</h3>
        <p className="text-2xl font-bold mb-4">1,200</p>
        <div className="flex items-center mb-4">
          <span className="text-2xl font-bold mr-2">4.4</span>
          <div className="flex text-yellow-400">
            {Array.from({ length: 5 }).map((_, index) => (
              <span key={index}>★</span>
            ))}
          </div>
          <span className="text-gray-500 ml-2">32 reviews</span>
        </div>
      </div>

      {/* Star Distribution */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-bold mb-4">Rating Breakdown</h3>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((stars) => (
            <div key={stars} className="flex items-center">
              <span className="w-8">{stars} ★</span>
              <div className="flex-1 bg-gray-200 h-2 rounded mx-2">
                <div
                  className="bg-yellow-400 h-2 rounded"
                  style={{ width: `${(stars / 5) * 100}%` }}
                ></div>
              </div>
              <span className="w-8 text-right">0</span>
            </div>
          ))}
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{review.author}</h3>
              <span className="text-gray-500">{review.role}</span>
            </div>

            {/* Star Rating */}
            <div className="flex text-yellow-500 mb-2">
              {Array.from({ length: review.stars }).map((_, index) => (
                <span key={index}>★</span>
              ))}
            </div>

            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-blue-900 text-white p-6 fixed h-full">
        <h1 className="text-2xl font-bold mb-6">Epitome</h1>
        <nav className="space-y-4">
          {["Dashboard", "Property", "User", "Transactions", "Reviews"].map((item) => (
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
          <button className="mt-10 flex items-center gap-2 text-red-400 hover:bg-red-500 hover:text-white p-3 rounded-lg transition">
            <IoLogOutOutline size={20} /> Log Out
          </button>
        </nav>
      </aside>
      <main className="flex-1 p-8 ml-64">{renderContent()}</main>
    </div>
  );
};

export default AdminDashboard;