import React from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import "./index.css"
function App() {
  return (
    <div>
      <Navbar/>
      {/* <Header /> */}
      <Home />
    </div>
  );
}

export default App;
