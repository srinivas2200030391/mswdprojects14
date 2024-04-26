import React from "react";
import { Box, useTheme } from "@mui/material";
import Modal from "@mui/material/Modal";
import Header from "../../DashComponents1/Header";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config.jsx";
const Customers = () => {
  const theme = useTheme();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({});

  const handleUpdate = async (user) => {
    try {
      const user1 = localStorage.getItem("User");
      const accountNumber = JSON.parse(user1)[0].accountnumber;

      const response = await axios.post(
        `${config.baseURL}/users/applyloan`,
        {
          title: user,
         account: accountNumber,
        }
      );
      if (response.data === "You have already applied for this loan") {
        alert(response.data)
      }
      axiosData();
    } catch (e) {
      console.log(e.message);
    }
  };

  const axiosData = async () => {
    try {
      const response = await axios.get(`${config.baseURL}/admin/viewloans`);
      console.log(response.data);
      setData(response.data);
    } catch (e) {
      setError(e.message);
    }
  };
  useEffect(() => {
    axiosData();
  }, []); //No dependencies

  const deleteusers = async (id) => {
    try {
      const response = await axios.delete(
        `${config.baseURL}/admin/deleteloans/${id}`
      );
      axiosData();
    } catch (e) {
      console.log(e.message);
    }
  };

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
      field: "action",
      headerName: "Action",
      flex: 0.5,
      renderCell: (params) => (
        <div style={{ marginLeft: "-6pt" }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleUpdate(params.row.title)}>
            Apply
          </Button>
        </div>
      ),
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
