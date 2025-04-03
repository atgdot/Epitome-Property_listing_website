import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  matchPath,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./utils/Store/store";

// Context Providers
import { TestimonialProvider } from "./Context/TestimonialContext";
import { PropertyProvider } from "./Context/PropertycardContext";
import { RecommendationProvider } from "./Context/RecommendationContext";
import { PhotoProvider } from "./context/PhotoContext";

// Components & Pages
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./components/Home";
import Projects from "./components/Projects";
import PropertyListing from "./components/PropertyListing";
import PropertyDetails from "./components/PropertyDetails";
import Recommendations from "./components/Recommendation";
import UserManagement from "./components/UserManagement";

// Pages
import IndiaBulls from "./pages/IndiaBulls";
import Property from "./pages/Property";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import Subsections from "./pages/Subsections";

// Residential Full Listing Pages
import LuxuryProjectsFull from "./pages/LuxuryProjectsFull";
import UpcomingProjectsFull from "./pages/UpcomingProjectsFull";
import HighRiseApartmentsFull from "./pages/HighRiseApartmentsFull";

// Commercial Full Listing Pages
import OfficesFull from "./pages/OfficesFull";
import PreLeasedOfficesFull from "./pages/PreLeasedOfficesFull";
import PreRentedFull from "./pages/PreRentedFull";
import ScoProjectsFull from "./pages/ScoProjectsFull";

// Admin Pages
import AdminDashboard from "./Admin/AdminDashboard";

// Styles
import "./index.css";

// Define routes where the Navbar or Footer should be hidden
const HIDE_NAVBAR_PATTERNS = [
  "/indiabulls",
  "/admin-dashboard",
  "/user-management",
  "/property",
  "/PropertyDetails",
  "/property/:id",
];

const HIDE_FOOTER_PATTERNS = [
  "/admin-dashboard",
  "/user-management",
  "/property/:id",
];

function Layout() {
  const location = useLocation();

  // Helper function to check if current path matches any of the patterns
  const shouldHideElement = (patterns) => {
    return patterns.some((pattern) => {
      const match = matchPath(pattern, location.pathname);
      return match !== null;
    });
  };

  const shouldHideNavbar = shouldHideElement(HIDE_NAVBAR_PATTERNS);
  const shouldHideFooter = shouldHideElement(HIDE_FOOTER_PATTERNS);

  return (
    <div className="flex flex-col min-h-screen">
      {!shouldHideNavbar && <Navbar />}

      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/indiabulls" element={<IndiaBulls />} />
          <Route path="/property" element={<Property />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/PropertyListing" element={<PropertyListing />} />

          {/* Property Details Routes */}
          <Route
            path="/PropertyDetails"
            element={
              <div className="min-h-screen">
                <PropertyDetails />
                <Recommendations />
              </div>
            }
          />
          <Route path="/property/:_id" element={<PropertyDetailPage />} />

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

          {/* Other Routes */}
          <Route path="/subsections" element={<Subsections />} />

          {/* Admin Routes */}
          <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
          <Route path="/user-management" element={<UserManagement />} />

          {/* 404 Route */}
          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold mb-4">404</h1>
                  <p className="text-xl">Page not found</p>
                </div>
              </div>
            }
          />
        </Routes>
      </main>

      {!shouldHideFooter && <Footer />}
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
