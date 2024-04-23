import { ScopedCssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { themeSettings } from "./theme";
import Layout from "./scenes/layout";
import Dashboard from "./scenes/dashboard";
import Products from "./scenes/products";

import Transactions from "./scenes/transactions";
import Transfer from "./scenes/transfer";
import Overview from "./scenes/overview";
import Daily from "./scenes/daily";
import Monthly from "./scenes/monthly";
import Breakdown from "./scenes/breakdown";

import Performance from "./scenes/performance";
import Profile from './scenes/profile';


function UserDashboard() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const location = useLocation();
  const userEmail = location.state?.email || "";

  

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <ScopedCssBaseline />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/dashboard/*" element={<Dashboard />} exact/>
            <Route path="/products" element={<Products />} exact/>
            <Route path="/transactions" element={<Transactions />} exact/>
            <Route path="/transfer" element={<Transfer />} exact/>
            <Route path="/overview" element={<Overview />} exact/>
            <Route path="/daily" element={<Daily />} exact/>
            <Route path="/monthly" element={<Monthly />} exact/>
            <Route path="/breakdown" element={<Breakdown />} exact/>
            <Route path="/profile" element={<Profile email={userEmail}/>} exact/>
            <Route path="/user-dashboard/performance" element={<Performance />} exact/>
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default UserDashboard;
