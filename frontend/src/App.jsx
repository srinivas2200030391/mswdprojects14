import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home.jsx";
import React from "react";
import UserDashboard from "./UserDashboard.jsx";
import AdminDashboard from "./AdminDashboard.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/user-dashboard/*" element={<UserDashboard />} />
          <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
