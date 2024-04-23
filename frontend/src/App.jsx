import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home.jsx";
import React, { useEffect, useState } from "react";
import UserDashboard from "./UserDashboard.jsx";
import AdminDashboard from "./AdminDashboard.jsx";
function App() {
  const [isCustomerLoggedIn,setIsCustomerLoggedIn] = useState(null)
  const [isAdminLoggedIn,setIsAdminLoggedIn] = useState(null)

  useEffect(() => {
  const customerloggedIn = localStorage.getItem("isCustomerLoggedIn")=="true";
  const adminloggedIn = localStorage.getItem("isAdminLoggedIn")=="true"

  setIsCustomerLoggedIn(customerloggedIn)
  setIsAdminLoggedIn(adminloggedIn)
  }, []);

  const onCustomerLogin = ()=>{
    localStorage.setItem("isCustomerLoggedIn","true")
    setIsCustomerLoggedIn(true)
  }
  const onAdminLogin = ()=>{
    localStorage.setItem("isAdminLoggedIn","true")
    setIsAdminLoggedIn(true)
  }
  
  return (
    
      <BrowserRouter>
        <Routes>
        <Route path="/admin-dashboard/*" element={<AdminDashboard onAdminLogin={onAdminLogin}/>} exact/>
        <Route path="/user-dashboard/*" element={<UserDashboard onCustomerLogin={onCustomerLogin}/>} exact/>
        <Route path="/*" element={<Home/>} exact/>
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;
