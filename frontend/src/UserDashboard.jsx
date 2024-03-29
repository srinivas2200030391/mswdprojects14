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
import Profile from "./scenes/profile/index";
import Transactions from "./scenes/transactions";
import Transfer from "./scenes/transfer";
import Overview from "./scenes/overview";
import Daily from "./scenes/daily";
import Monthly from "./scenes/monthly";
import Breakdown from "./scenes/breakdown";
import Admin from "./scenes/admin";
import Performance from "./scenes/performance";

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
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/profile" element={<Profile email={userEmail} />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/transfer" element={<Transfer />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/daily" element={<Daily />} />
            <Route path="/monthly" element={<Monthly />} />
            <Route path="/breakdown" element={<Breakdown />} />
            <Route path="/admin" element={<Admin />} />
            <Route
              path="/user-dashboard/performance"
              element={<Performance />}
            />
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default UserDashboard;
