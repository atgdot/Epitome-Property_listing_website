import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import store  from "./utils/Store/store";
// Components & Pages
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
import Recommendations from "./components/Recommendation";
import ErrorBoundary from './components/ErrorBoundary';

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

// Context Providers
import { TestimonialProvider } from "./Context/TestimonialContext";
import { PropertyProvider } from "./Context/PropertycardContext";
import { RecommendationProvider } from "./Context/RecommendationContext";
import { PhotoProvider } from "./context/PhotoContext";

import "./index.css";
import { Provider } from "react-redux";

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
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/indiabulls" element={<IndiaBulls />} />
          <Route path="/property" element={<Property />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/PropertyListing" element={<PropertyListing />} />

          {/* Property Details now includes Recommendations */}
          <Route
            path="/PropertyDetails"
            element={
              <div>
                <PropertyDetails />
                <Recommendations />
              </div>
            }
          />

          {/* Residential Routes */}
          <Route path="/residential/luxury" element={<LuxuryProjectsFull />} />
          <Route
            path="/residential/upcoming"
            element={<UpcomingProjectsFull />}
          />
          <Route
            path="/residential/highrise"
            element={<HighRiseApartmentsFull />}
          />

          {/* Commercial Routes */}
          <Route path="/commercial/offices" element={<OfficesFull />} />
          <Route
            path="/commercial/preleased"
            element={<PreLeasedOfficesFull />}
          />
          <Route path="/commercial/prerented" element={<PreRentedFull />} />
          <Route path="/commercial/sco" element={<ScoProjectsFull />} />

          <Route path="/subsections" element={<Subsections />} />

          {/* Admin Routes */}
          <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
          <Route path="/user-management" element={<UserManagement />} />
        </Routes>
      </div>

      {!hideFooterRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PropertyProvider>
          <TestimonialProvider>
            <RecommendationProvider>
              <PhotoProvider>
                <Router>
                  <Layout />
                </Router>
              </PhotoProvider>
            </RecommendationProvider>
          </TestimonialProvider>
        </PropertyProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
