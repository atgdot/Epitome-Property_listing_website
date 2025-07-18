import React, { lazy, Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  matchPath,
  Navigate,
} from "react-router-dom";
import { Provider, useSelector, useDispatch } from "react-redux";
import store, { persistor } from "./utils/Store/store";
import { PersistGate } from "redux-persist/integration/react";
import { verifyToken } from "./utils/Store/slice/adminAuthSlice";

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
import AdminLogin from "./Admin/AdminLogin";

// Lazy loaded Location Pages
const GolfCourseRoad = lazy(() => import("./pages/GolfCourseRoad"));
const GolfCourseExtRoad = lazy(() => import("./pages/GolfCourseExtRoad"));
const MgRoad = lazy(() => import("./pages/MgRoad"));
const Nh48 = lazy(() => import("./pages/Nh48"));
const SohnaRoad = lazy(() => import("./pages/SohnaRoad"));
const HudaCityMetro = lazy(() => import("./pages/HudaCityMetro"));
const SprRoad = lazy(() => import("./pages/SprRoad"));

// Styles
import "./index.css";
import Contact from "./components/Contact";
import SearchResults from "./components/SearchResults";

// Define routes where the Navbar or Footer should be hidden
const HIDE_NAVBAR_PATTERNS = [
  "/indiabulls",
  "/admin-dashboard",
  "/admin-login",
  "/user-management",
  "/property",
  "/PropertyDetails",
  "/property/:id",
];

const HIDE_FOOTER_PATTERNS = [
  "/admin-dashboard",
  "/admin-login",
  "/user-management",
  "/property/:id",
];

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.adminAuth);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

// Loading component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

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
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/indiabulls" element={<IndiaBulls />} />
            <Route path="/property" element={<Property />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/PropertyListing" element={<PropertyListing />} />

            {/* Auth Routes */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/search" element={<SearchResults />} />

            {/* Protected Admin Routes */}
            <Route
              path="/admin-dashboard/*"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user-management"
              element={
                <ProtectedRoute>
                  <UserManagement />
                </ProtectedRoute>
              }
            />

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
            <Route
              path="/residential/luxury"
              element={<LuxuryProjectsFull />}
            />
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

            {/* Dedicated Location Pages */}
            <Route path="/golf-course-road" element={<GolfCourseRoad />} />
            <Route
              path="/golf-course-ext-road"
              element={<GolfCourseExtRoad />}
            />
            <Route path="/mg-road" element={<MgRoad />} />
            <Route path="/nh-48" element={<Nh48 />} />
            <Route path="/sohna-road" element={<SohnaRoad />} />
            <Route path="/huda-city-metro" element={<HudaCityMetro />} />
            <Route path="/spr-road" element={<SprRoad />} />

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
        </Suspense>
      </main>

      {!shouldHideFooter && <Footer />}
    </div>
  );
}

// Separate component for the authenticated app content
const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);

  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
};

// Main App component that provides the Redux store
function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
}

export default App;