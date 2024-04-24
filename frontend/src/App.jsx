import { BrowserRouter as Router } from "react-router-dom";
import Home from "./Components/Home.jsx";
import React, { useEffect, useState } from "react";
import UserDashboard from "./UserDashboard.jsx";
import AdminDashboard from "./AdminDashboard.jsx";

function App() {
  const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const customerloggedIn =
      localStorage.getItem("isCustomerLoggedIn") === "true";
    const adminloggedIn = localStorage.getItem("isAdminLoggedIn") === "true";

    setIsCustomerLoggedIn(customerloggedIn);
    setIsAdminLoggedIn(adminloggedIn);
  }, []);

  const onCustomerLogin = () => {
    localStorage.setItem("isCustomerLoggedIn", "true");
    setIsCustomerLoggedIn(true);
  };
  const onAdminLogin = () => {
    localStorage.setItem("isAdminLoggedIn", "true");
    setIsAdminLoggedIn(true);
  };

  return (
    <Router>
      {isAdminLoggedIn ? (
        <AdminDashboard />
      ) : isCustomerLoggedIn ? (
        <UserDashboard />
      ) : (
        <Home onAdminLogin={onAdminLogin} onCustomerLogin={onCustomerLogin} />
      )}
    </Router>
  );
}

export default App;
