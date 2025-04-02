import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // ✅ 여기 추가됨!
import "./index.css";
import FranchisePage from "./assets/Components/FranchisePage.jsx";
import BoardPage from "./assets/Components/BoardPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FranchisePage />} />
        <Route path="/board" element={<BoardPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
