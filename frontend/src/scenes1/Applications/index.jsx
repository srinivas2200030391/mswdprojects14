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
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const handleUpdate = async (user1) => {
    try {
      await axios.put(`http://localhost:2014/admin/acceptloan`, {
        title: user1[0],
        account: user1[1],
      });
      axiosData();
    } catch (e) {
      console.log(e.message);
    }
  };

  const axiosData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:2014/admin/viewpendingloans"
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

  const deleteusers = async (user1) => {
    try {
      await axios.put(`http://localhost:2014/admin/rejectloan`, {
        title: user1[0],
        account: user1[1],
      });
      axiosData();
    } catch (e) {
      console.log(e.message);
    }
  };

  const columns = [
    {
      field: "title",
      headerName: "Title",
      flex: 0.5,
    },
    {
      field: "loanAmount",
      headerName: "loanAmount",
      flex: 0.5,
    },
    {
      field: "interestRate",
      headerName: "interestRate",
      flex: 1,
    },
    {
      field: "loanTerm",
      headerName: "loanTerm",
      flex: 0.5,
    },
    {
      field: "applicantAccount",
      headerName: "applicantAccount",
      flex: 0.4,
    },
    {
      field: "applicantName",
      headerName: "applicantName",
      flex: 0.5,
    },
    {
      field: "status",
      headerName: "status",
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
            onClick={() =>
              handleUpdate([params.row.title, params.row.applicantAccount])
            }>
            Accept
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() =>
              deleteusers([params.row.title, params.row.applicantAccount])
            }
            style={{ marginLeft: "8px" }}>
            Reject
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Bankers" subtitle="List of Bankers" />
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
