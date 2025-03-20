import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import IndiaBulls from "./pages/IndiaBulls";
import Property from "./pages/Property";
import Projects from "./components/Projects";
import PropertyListing from "./components/PropertyListing";
import PropertyDetails from "./components/PropertyDetails";
import Footer from "./components/Footer";
import AdminDashboard from "./admin/AdminDashboard";
import UserManagement from "./components/UserManagement";

import "./index.css";

function Layout() {
  const location = useLocation();

  // Define routes where the Navbar or Footer should be hidden
  const hideNavbarRoutes = ["/indiabulls", "/admin-dashboard", "/user-management"];
  const hideFooterRoutes = ["/admin-dashboard", "/user-management"];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Show Navbar unless the route is in hideNavbarRoutes */}
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      {/* Page Content */}
      <div className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/indiabulls" element={<IndiaBulls />} />
          <Route path="/property" element={<Property />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/PropertyListing" element={<PropertyListing />} />
          <Route path="/PropertyDetails" element={<PropertyDetails />} />

          {/* Admin Routes */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/user-management" element={<UserManagement />} />
        </Routes>
      </div>

      {/* Show Footer unless the route is in hideFooterRoutes */}
      {!hideFooterRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
