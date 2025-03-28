import React from "react";
import App from "./App";
import ReactDOM from "react-dom/client";
import { BannerProvider } from "./Context/BannerContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BannerProvider>
      <App />
    </BannerProvider>
  </React.StrictMode>
);
