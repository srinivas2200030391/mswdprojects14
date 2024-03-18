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
        `http://localhost:2014/admin/updateloans/${selectedUser._id}`,
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
      const response = await axios.get("http://localhost:2014/admin/viewloans");
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
        `http://localhost:2014/admin/deleteloans/${id}`
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
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={updatedUser.title || selectedUser.title}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ width: "170%" }}>
                <label htmlFor="loanAmount">Loan Amount: </label>
                <input
                  type="text"
                  id="loanAmount"
                  name="loanAmount"
                  value={updatedUser.loanAmount || selectedUser.loanAmount}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ width: "170%" }}>
                <label htmlFor="interestRate">Interest Rate:</label>
                <input
                  type="text"
                  id="interestRate"
                  name="interestRate"
                  value={updatedUser.interestRate || selectedUser.interestRate}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ width: "170%" }}>
                <label htmlFor="loanTerm">Loan Term:</label>
                <input
                  type="text"
                  id="loanTerm"
                  name="loanTerm"
                  value={updatedUser.loanTerm || selectedUser.loanTerm}
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
