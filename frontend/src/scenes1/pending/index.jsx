import React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetCustomersQuery } from "../../state1/api";
import Header from "../../DashComponents1/Header";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import axios from "axios";

const pending = () => {
  const theme = useTheme();
  const [data, setData] = useState([]);
  const axiosData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:2014/admin/viewpending"
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

  const deleteusers = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:2014/admin/rejectusers/${id}`
      );
      axiosData();
    } catch (e) {
      console.log(e.message);
    }
  };
  const acceptusers = async (id) => {
    try {
      console.log(id);
      const response = await axios.post(
        `http://localhost:2014/admin/acceptusers/${id}`
      );
      axiosData();
    } catch (e) {
      console.log(e.message);
    }
  };

  const columns = [
    {
      field: "accountnumber",
      headerName: "ID",
      flex: 0.5,
    },
    {
      field: "username",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "aadhar",
      headerName: "Aadhar Number",
      flex: 0.4,
    },
    {
      field: "gender",
      headerName: "Gender",
      flex: 0.5,
    },
    {
      field: "age",
      headerName: "Age",
      flex: 0.5,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 0.7,
      renderCell: (params) => (
        <div style={{ marginLeft: "-6pt" }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => acceptusers(params.row.accountnumber)}>
            Accept
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => deleteusers(params.row.accountnumber)}
            style={{ marginLeft: "8px" }}>
            Reject
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Pending Users" subtitle="List of Pending Users" />
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

export default pending;
