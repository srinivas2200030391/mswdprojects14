import { ScopedCssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import { themeSettings } from "./theme";
import Layout from "./scenes/layout";
import Dashboard from "./scenes/dashboard";
import Products from "./scenes/products";

import Transactions from "./scenes/transactions";
import Transfer from "./scenes/transfer";

import Daily from "./scenes/daily";
import Monthly from "./scenes/Loans";
import Breakdown from "./scenes/breakdown";

import Performance from "./scenes/performance";
import Profile from "./scenes/profile";
import Loans from "./scenes/Loans";
import AppliedLoans from "./scenes/AppliedLoans";

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
            <Route path="/" element={<Dashboard />} exact />
            <Route
              path="/user-dashboard/dashboard/*"
              element={<Dashboard />}
              exact
            />
            <Route
              path="/user-dashboard/products"
              element={<Products />}
              exact
            />
            <Route
              path="/user-dashboard/transactions"
              element={<Transactions />}
              exact
            />
            <Route
              path="/user-dashboard/transfer"
              element={<Transfer />}
              exact
            />
            <Route
              path="/user-dashboard/appliedloans"
              element={<AppliedLoans />}
              exact
            />
            <Route path="/user-dashboard/Loans" element={<Loans />} exact />
            <Route path="/user-dashboard/monthly" element={<Monthly />} exact />
            <Route
              path="/user-dashboard/breakdown"
              element={<Breakdown />}
              exact
            />
            <Route
              path="/user-dashboard/profile"
              element={<Profile email={userEmail} />}
              exact
            />
            <Route
              path="/user-dashboard/performance"
              element={<Performance />}
              exact
            />
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default UserDashboard;
