import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import FranchisePage from "./Components/FranchisePage.jsx";
import BoardPage from "./Components/BoardPage.jsx";
import ReviewListPage from "./Components/ReviewListPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FranchisePage />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/reviews/all" element={<ReviewListPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
