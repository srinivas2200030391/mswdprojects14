import React from "react";
import { Box, useTheme } from "@mui/material";
import Modal from "@mui/material/Modal";
import Header from "../../DashComponents1/Header";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import axios from "axios";

const Customers = () => {
  const theme = useTheme();
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const axiosData = async () => {
    try {
      const user = localStorage.getItem("User");
      const account = JSON.parse(user)[0].accountnumber;
      const response = await axios.get(
        `http://localhost:2014/users/getappliedloans/${account}`
      );
      console.log(response.data);
      setData(response.data);
    } catch (e) {
      setError(e.message);
    }
  };
  useEffect(() => {
    axiosData();
  }, []); //No dependencies

  const columns = [
    {
      field: "title",
      headerName: "Title",
      flex: 1,
    },
    {
      field: "loanAmount",
      headerName: "Loan Amount",
      flex: 0.5,
    },
    {
      field: "interestRate",
      headerName: "Interest Rate",
      flex: 1,
    },
    {
      field: "loanTerm",
      headerName: "Loan Term",
      flex: 0.5,
    },

    {
      field: "status",
      headerName: "Status",
      flex: 0.5,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Loans" subtitle="List of Loans" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}>
        <DataGrid
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Customers;
