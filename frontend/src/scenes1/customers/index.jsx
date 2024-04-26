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
  const handleInputChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };
  const handleUpdate = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };
  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(
        `${config.baseURL}/admin/updateuser/${selectedUser._id}`,
        updatedUser
      );
      console.log(response.data);
      handleClose();
      axiosData();
    } catch (e) {
      console.log(e.message);
    }
  };
  const axiosData = async () => {
    try {
      console.log(`${config.baseURL}`);
      const response = await axios.get(`${config.baseURL}/admin/viewusers`);
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
      await axios.delete(`${config.baseURL}/admin/deleteusers/${id}`);
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
      // renderCell: (params) => {
      //   return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      // },
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
            onClick={() => handleUpdate(params.row)}>
            Update
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => deleteusers(params.row._id)}
            style={{ marginLeft: "8px" }}>
            Delete
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
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-30%, -50%)",
            bgcolor: "background.paper",
            borderRadius: "10px",

            boxShadow: 24,
            width: "25%",
            p: 4,
            display: "flex",
            justifyContent: "flex-start",
            alignContent: "center",
          }}>
          {selectedUser && (
            <div>
              <h2
                style={{
                  padding: "20px",
                  textAlign: "center",
                  transform: "translateX(60px)",
                }}>
                Update User Details
              </h2>
              <div style={{ width: "170%", fontWeight: "bolder" }}>
                <label htmlFor="username">Name:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={updatedUser.username || selectedUser.username}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ width: "170%" }}>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={updatedUser.email || selectedUser.email}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ width: "170%" }}>
                <label htmlFor="phone">Phone:</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={updatedUser.phone || selectedUser.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ width: "170%" }}>
                <label htmlFor="Aadhar">Aadhar:</label>
                <input
                  type="text"
                  id="aadhar"
                  name="Aadhar"
                  value={updatedUser.aadhar || selectedUser.aadhar}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ width: "170%" }}>
                <label htmlFor="age">Age:</label>
                <input
                  type="text"
                  id="age"
                  name="age"
                  value={updatedUser.age || selectedUser.age}
                  onChange={handleInputChange}
                />
              </div>

              <button
                onClick={handleSaveChanges}
                style={{
                  border: "1px solid black",
                  padding: "10px",
                  transform: "translateX(115%)",
                  borderRadius: "20px",
                  backgroundColor: "rgba(255,155,259)",
                  marginTop: "15px",
                  cursor: "pointer",
                }}>
                Save Changes
              </button>
            </div>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default Customers;
