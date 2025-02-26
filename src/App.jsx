import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import IndiaBulls from "./pages/IndiaBulls";
import "./index.css";
import Property from "./pages/Property";
import Projects from "./components/Projects";
import PropertyListing from "./components/PropertyListing";
import PropertyDetails from "./components/PropertyDetails";

function Layout() {
  const location = useLocation();
  const hideNavbarRoutes = ["/indiabulls"];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/property" element={<Property />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/PropertyListing" element={<PropertyListing />} />
        <Route path="/PropertyDetails" element={<PropertyDetails />} />
       
      </Routes>
    </>
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
