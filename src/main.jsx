import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import AppProvider from "./components/common/AppProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider />
  </StrictMode>
);
