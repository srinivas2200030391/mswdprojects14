import { ScopedCssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "./theme";
import Layout from "./scenes1/layout";
import Dashboard from "./scenes1/dashboard";
import Pending from "./scenes1/pending";
import Customers from "./scenes1/customers/index";
import Rejected from "./scenes1/rejected";
import Loans from "./scenes1/Loans";
import AddLoans from "./scenes1/AddLoans";
import Applications from "./scenes1/Applications";

function AdminDashboard() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <ScopedCssBaseline />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/pending" element={<Pending />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/rejected" element={<Rejected />} />
            <Route path="/Loans" element={<Loans />} />
            <Route path="/AddLoans" element={<AddLoans />} />
            <Route path="/Applications" element={<Applications />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default AdminDashboard;
