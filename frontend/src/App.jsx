import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home.jsx";
import React from "react";
import UserDashboard from "./UserDashboard.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/user-dashboard/*" element={<UserDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
