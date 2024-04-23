import React, { useState,useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetTransactionsQuery } from "../../state/api";
import Header from "../../DashComponents/Header";
import DataGridCustomToolbar from "../../DashComponents/DataGridCustomToolbar";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Modal from "@mui/material/Modal";
import axios from "axios";

const Transactions =   () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [sender,setSender] = useState("");
  const [reciever,setReciever] = useState("");

  const maketransaction = ()=>{
    setOpen(true);
    
  }
  const handleClose = () => {
    setOpen(false);
    
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://localhost:2014/users/viewcustomers');
        setUsers(response.data); // Assuming the response data is an array of users
      } catch (error) {
        console.error('Failed to fetch users', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(
        `http://localhost:2014/users/updateuser/${userData._id}`,
        updatedUserData
      );
      console.log(response.data);
      handleClose();
    } catch (e) {
      console.log(e.message);
    }
  };
  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });
  

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
     

    <Box m="1rem 2rem">
      <Header title="TRANSACTIONS" subtitle="Entire list of transactions" />
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
          }}
        >
          <div>
            <h2 style={{ padding: "20px", textAlign: "center" }}>
              Transaction
            </h2>
            
            <div style={{ width: "170%" }}>
              <label htmlFor="email">Sender Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                // value={updatedUserData.email || ""}
                // onChange={handleInputChange}
              />
            </div>
            <div style={{ width: "170%" }}>
              <label htmlFor="password"> Sender Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                // value={updatedUserData.email || ""}
                // onChange={handleInputChange}
              />
            </div>
            
            <div style={{ width: "170%" }}>
              <label htmlFor="reciever">Receiver Email:</label>
              <input
                type="email"
                id="recieveremail"
                name="recieveremail"
                // value={updatedUserData.phone || ""}
                // onChange={handleInputChange}
              />
            </div>
            <div style={{ width: "170%" }}>
              <label htmlFor="raccountno">Receiver Account No:</label>
              <input
                type="number"
                id="raccountno"
                name="raccountno"
                // value={updatedUserData.phone || ""}
                // onChange={handleInputChange}
              />
            </div>
            <div style={{ width: "170%" }}>
              <label htmlFor="amount">Amount:</label>
              <input
                type="number"
                id="amount"
                name="amount"
                // value={updatedUserData.phone || ""}
                // onChange={handleInputChange}
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
              }}
            >
             Make Transaction
            </button>
          </div>
        </Box>
      </Modal>
      <Box
        height="80vh"
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
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={(data && data.transactions) || []}
            columns={columns}
            rowCount={(data && data.total) || 0}
            rowsPerPageOptions={[20, 50, 100]}
            pagination
            page={page}
            pageSize={pageSize}
            paginationMode="server"
            sortingMode="server"
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            onSortModelChange={(newSortModel) => setSort(...newSortModel)}
            components={{ Toolbar: DataGridCustomToolbar }}
            componentsProps={{ toolbar: { searchInput, setSearchInput, setSearch } }}
          />
          
      </Box>
      <Box sx={{ textAlign: "center" }}>
          <Button variant="contained" color="primary" onClick={()=>maketransaction()}>
            Make Transaction
          </Button>
        </Box>
    </Box>
    
  );
};

export default Transactions;
