import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import FranchisePage from './Components/FranchisePage/FranchisePage';
import BoardPage from './Components/Board/BoardPage';
import ReviewListPage from './Components/ReviewListPage/ReviewListPage';
import AdminLogin from "./Components/admin/adminlogin";
import AdminPage from "./Components/admin/adminpage";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FranchisePage />} />ws
        <Route path="/board" element={<BoardPage />} />
        <Route path="/reviews/all" element={<ReviewListPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/adminlogin" element={<AdminLogin />} /> 
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
  