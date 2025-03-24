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
import AdminDashboard from "./admin/AdminDashboard.jsx";
import UserManagement from "./components/UserManagement";

// Residential Full Listing Pages
import LuxuryProjectsFull from "./pages/LuxuryProjectsFull";
import UpcomingProjectsFull from "./pages/UpcomingProjectsFull";
import HighRiseApartmentsFull from "./pages/HighRiseApartmentsFull";
import Subsections from "./pages/Subsections";

// Commercial Full Listing Pages
import OfficesFull from "./pages/OfficesFull";
import PreLeasedOfficesFull from "./pages/PreLeasedOfficesFull";
import PreRentedFull from "./pages/PreRentedFull";
import ScoProjectsFull from "./pages/ScoProjectsFull";

import { TestimonialProvider } from "./Context/TestimonialContext";
import "./index.css";

function Layout() {
  const location = useLocation();

  // Define routes where the Navbar or Footer should be hidden
  const hideNavbarRoutes = [
    "/indiabulls",
    "/admin-dashboard",
    "/user-management",
  ];
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

          {/* Residential Full Listing Routes */}
          <Route path="/residential/luxury" element={<LuxuryProjectsFull />} />
          <Route path="/residential/upcoming" element={<UpcomingProjectsFull />} />
          <Route path="/residential/highrise" element={<HighRiseApartmentsFull />} />

          {/* Commercial Full Listing Routes */}
          <Route path="/commercial/offices" element={<OfficesFull />} />
          <Route path="/commercial/preleased" element={<PreLeasedOfficesFull />} />
          <Route path="/commercial/prerented" element={<PreRentedFull />} />
          <Route path="/commercial/sco" element={<ScoProjectsFull />} />

          {/* Optional: A Subsections page that might include previews, menus, etc. */}
          <Route path="/subsections" element={<Subsections />} />

          {/* Admin Routes */}
          <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
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
    <TestimonialProvider>
      <Router>
        <Layout />
      </Router>
    </TestimonialProvider>
  );
}

export default App;
