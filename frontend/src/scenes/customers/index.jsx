import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../DashComponents/Header";
import axios from 'axios';

const Customers = () => {
  const theme = useTheme();
  const [customers, setCustomers] = useState([]);
  console.log("customers", customers);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:2014/users/viewcustomers");
      const customersWithId = response.data.map(customer => ({ ...customer, id: customer._id }));
      setCustomers(customersWithId);
    } catch (e) {
      console.error(e.message);
    }
  };
  

  useEffect(() => {
    fetchCustomers();
  }, []);

  const columns = [
    {
      field: "username",
      headerName: "Username",
      flex: 1,
    },
    {
      field: "fullname",
      headerName: "Full Name",
      flex: 1,
    },
    {
      field: "accountnumber",
      headerName: "Account Number",
      flex: 1,
    },
    {
      field: "aadhar",
      headerName: "Aadhar",
      flex: 1,
    },
    {
      field: "age",
      headerName: "Age",
      flex: 0.5,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "gender",
      headerName: "Gender",
      flex: 0.5,
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CUSTOMERS" subtitle="List of Customers" />
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
          loading={!customers.length}
          rows={customers}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Customers;
