// import React, { useState,useEffect } from "react";
// import { Box, useTheme } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { useGetTransactionsQuery } from "../../state/api";
// import Header from "../../DashComponents/Header";
// import DataGridCustomToolbar from "../../DashComponents/DataGridCustomToolbar";
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import Modal from "@mui/material/Modal";
// import axios from "axios";

// const Transactions =   () => {
//   const theme = useTheme();
//   const [open, setOpen] = useState(false);
//   // values to be sent to the backend
//   const [page, setPage] = useState(0);
//   const [pageSize, setPageSize] = useState(20);
//   const [sort, setSort] = useState({});
//   const [search, setSearch] = useState("");

//   const [sender,setSender] = useState("");
//   const [reciever,setReciever] = useState("");

//   const maketransaction = ()=>{
//     setOpen(true);

//   }
//   const handleClose = () => {
//     setOpen(false);

//   };
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('https://localhost:2014/users/viewcustomers');
//         setUsers(response.data); // Assuming the response data is an array of users
//       } catch (error) {
//         console.error('Failed to fetch users', error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleSaveChanges = async () => {
//     try {
//       const response = await axios.put(
//         `http://localhost:2014/users/updateuser/${UserData[0]._id}`,
//         selectedUser
//       );
//       console.log(response.data);
//       handleClose();
//     } catch (e) {
//       console.log(e.message);
//     }
//   };
//   const [searchInput, setSearchInput] = useState("");
//   const { data, isLoading } = useGetTransactionsQuery({
//     page,
//     pageSize,
//     sort: JSON.stringify(sort),
//     search,
//   });

//   const columns = [
//     {
//       field: "_id",
//       headerName: "ID",
//       flex: 1,
//     },
//     {
//       field: "userId",
//       headerName: "User ID",
//       flex: 1,
//     },
//     {
//       field: "createdAt",
//       headerName: "CreatedAt",
//       flex: 1,
//     },
//     {
//       field: "products",
//       headerName: "# of Products",
//       flex: 0.5,
//       sortable: false,
//       renderCell: (params) => params.value.length,
//     },
//     {
//       field: "cost",
//       headerName: "Cost",
//       flex: 1,
//       renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
//     },
//   ];

//   return (

//     <Box m="1rem 2rem">
//       <Header title="TRANSACTIONS" subtitle="Entire list of transactions" />
//       <Modal open={open} onClose={handleClose}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-30%, -50%)",
//             bgcolor: "background.paper",
//             borderRadius: "10px",
//             boxShadow: 24,
//             width: "25%",
//             p: 4,
//             display: "flex",
//             justifyContent: "flex-start",
//             alignContent: "center",
//           }}
//         >
//           <div>
//             <h2 style={{ padding: "20px", textAlign: "center" }}>
//               Transaction
//             </h2>

//             <div style={{ width: "170%" }}>
//               <label htmlFor="email">Sender Email:</label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 // value={selectedUser[0].email || ""}
//                 // onChange={handleInputChange}
//               />
//             </div>
//             <div style={{ width: "170%" }}>
//               <label htmlFor="password"> Sender Password:</label>
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 // value={selectedUser[0].email || ""}
//                 // onChange={handleInputChange}
//               />
//             </div>

//             <div style={{ width: "170%" }}>
//               <label htmlFor="reciever">Receiver Email:</label>
//               <input
//                 type="email"
//                 id="recieveremail"
//                 name="recieveremail"
//                 // value={selectedUser[0].phone || ""}
//                 // onChange={handleInputChange}
//               />
//             </div>
//             <div style={{ width: "170%" }}>
//               <label htmlFor="raccountno">Receiver Account No:</label>
//               <input
//                 type="number"
//                 id="raccountno"
//                 name="raccountno"
//                 // value={selectedUser[0].phone || ""}
//                 // onChange={handleInputChange}
//               />
//             </div>
//             <div style={{ width: "170%" }}>
//               <label htmlFor="amount">Amount:</label>
//               <input
//                 type="number"
//                 id="amount"
//                 name="amount"
//                 // value={selectedUser[0].phone || ""}
//                 // onChange={handleInputChange}
//               />
//             </div>

//             <button
//               onClick={handleSaveChanges}
//               style={{
//                 border: "1px solid black",
//                 padding: "10px",
//                 transform: "translateX(115%)",
//                 borderRadius: "20px",
//                 backgroundColor: "rgba(255,155,259)",
//                 marginTop: "15px",
//                 cursor: "pointer",
//               }}
//             >
//              Make Transaction
//             </button>
//           </div>
//         </Box>
//       </Modal>
//       <Box
//         height="80vh"
//         sx={{
//           "& .MuiDataGrid-root": {
//             border: "none",
//           },
//           "& .MuiDataGrid-cell": {
//             borderBottom: "none",
//           },
//           "& .MuiDataGrid-columnHeaders": {
//             backgroundColor: theme.palette.background.alt,
//             color: theme.palette.secondary[100],
//             borderBottom: "none",
//           },
//           "& .MuiDataGrid-virtualScroller": {
//             backgroundColor: theme.palette.primary.light,
//           },
//           "& .MuiDataGrid-footerContainer": {
//             backgroundColor: theme.palette.background.alt,
//             color: theme.palette.secondary[100],
//             borderTop: "none",
//           },
//           "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
//             color: `${theme.palette.secondary[200]} !important`,
//           },
//         }}>
//         <DataGrid
//             loading={isLoading || !data}
//             getRowId={(row) => row._id}
//             rows={(data && data.transactions) || []}
//             columns={columns}
//             rowCount={(data && data.total) || 0}
//             rowsPerPageOptions={[20, 50, 100]}
//             pagination
//             page={page}
//             pageSize={pageSize}
//             paginationMode="server"
//             sortingMode="server"
//             onPageChange={(newPage) => setPage(newPage)}
//             onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
//             onSortModelChange={(newSortModel) => setSort(...newSortModel)}
//             components={{ Toolbar: DataGridCustomToolbar }}
//             componentsProps={{ toolbar: { searchInput, setSearchInput, setSearch } }}
//           />

//       </Box>
//       <Box sx={{ textAlign: "center" }}>
//           <Button variant="contained" color="primary" onClick={()=>maketransaction()}>
//             Make Transaction
//           </Button>
//         </Box>
//     </Box>

//   );
// };

// export default Transactions;

import React, { useState, useEffect } from "react";
import Header from "../../DashComponents/Header";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import Modal from "@mui/material/Modal";
import {
  Box,
  Card,
  CardContent,
  Typography,
  useTheme,
  Button,
  Container,
  TextField,
} from "@mui/material";

const Transactions = () => {
  const theme = useTheme();
  const [UserData, setUserData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [showCreditForm, setShowCreditForm] = useState(false);
  const [openTransferModal, setOpenTransferModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [amount, setAmount] = useState("");

  const handleTransferClick = (userId) => {
    const user = data.transactions.find(
      (transaction) => transaction.userId === userId
    );
    setSelectedUser(user.userId);
    setOpen(true);
  };

  const handleTransfer = async () => {
    try {
      // Perform transfer logic here
      const result = axios.put("http://localhost:2014/users/Credit", {
        searchInput,
        amount,
      });
      // Reset form values
      setSelectedUser("");
      setAmount(0);
      setOpenTransferModal(false);
      if (result) {
        console.log("Success");
      }
    } catch (error) {
      console.error("Failed to transfer", error);
    }
  };

  const handleCreditClick = () => {
    setOpenTransferModal(true);
  };
  const handleCreditClick1 = () => {
    setSelectedUser(Object.values(UserData));
    setShowCreditForm(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // const handleTransfer = async () => {
  //   try {
  //     const response = await axios.post("http://localhost:2014/users/credit", {
  //       accountnumber: selectedUser.accountnumber,
  //       amount: parseFloat(amount),
  //     });
  //     // Update the user data with the new balance
  //     const selectedUser = UserData[0].map((user) => {
  //       if (user.accountnumber === selectedUser.accountnumber) {
  //         return { ...user, balance: response.data.balance };
  //       }
  //       return user;
  //     });
  //     setUserData(selectedUser);
  //     setShowCreditForm(false);
  //     setAmount("");
  //   } catch (error) {
  //     console.error("Error transferring amount:", error);
  //   }
  // };
  const handleSearchInput = async () => {
    try {
      if (searchInput.length == 12) {
        const response = await axios.get(
          `http://localhost:2014/users/getuserbyaccount/${searchInput}`
        );
        if (response.data) {
          const resdata = [];
          resdata.push(response.data);
          setUserData(resdata);
        } else {
          setUserData([]);
        }
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearchInput();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchInput]);
  return (
    <div>
      <p
        style={{
          width: "10pt",
          transform: "translateX(50pt)",
          marginTop: "30pt",
        }}>
        <Header title="TransferMoney" />
      </p>
      <section style={{ transform: "translateX(275pt)", marginTop: "50pt" }}>
        <input
          type="text"
          placeholder="Please Enter Account Number"
          style={{
            width: "300pt",
            height: "35pt",
            border: "1px solid black",
            outline: "none",
            borderRadius: "70pt",
          }}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <SearchIcon
          style={{
            transform: "translateY(5pt)",
            paddingLeft: "10pt",
            height: "20pt",
            width: "20pt",
            cursor: "pointer",
          }}
          onClick={handleSearchInput}
        />
      </section>

      {UserData.length > 0 ? (
        <div>
          <Container
            maxWidth="xl"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "80vh",
              marginTop: "-90pt",
            }}>
            <Card
              sx={{
                width: "100%",
                boxShadow: theme.shadows[5],
                borderRadius: "16px",
              }}>
              <CardContent
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "32px",
                  padding: "48px",
                  backgroundColor: theme.palette.background.paper,
                }}>
                <Box>
                  <Typography
                    variant="h3"
                    component="div"
                    gutterBottom
                    sx={{
                      fontFamily: "Roboto, sans-serif",
                      color: theme.palette.secondary.main,
                      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                      padding: "5pt 0 5pt 0",
                    }}>
                    {UserData[0].username}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "Roboto, sans-serif",
                      fontWeight: "bold",
                      color: theme.palette.text.primary,
                      textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
                      padding: "5pt 0 5pt 0",
                    }}>
                    Full Name: {UserData[0].fullname}
                  </Typography>
                </Box>

                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "Roboto, sans-serif",
                    fontWeight: "bold",
                    color: theme.palette.text.primary,
                    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
                    padding: "5pt 0 5pt 0",
                  }}>
                  Age: {UserData[0].age}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "Roboto, sans-serif",
                    fontWeight: "bold",
                    color: theme.palette.text.primary,
                    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
                    padding: "5pt 0 5pt 0",
                  }}>
                  Account Number: {UserData[0].accountnumber}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "Roboto, sans-serif",
                    fontWeight: "bold",
                    color: theme.palette.text.primary,
                    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
                    padding: "5pt 0 5pt 0",
                  }}>
                  Gender: {UserData[0].gender}
                </Typography>
              </CardContent>
            </Card>
          </Container>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: -12,
              transform: "translateX(-50pt)",
            }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreditClick}
              sx={{
                fontSize: "1rem",
                padding: "8px 8px",
                boxShadow:
                  "0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)",
              }}>
              Transfer
            </Button>
          </Box>
        </div>
      ) : (
        <h1>User Data Not Found</h1>
      )}
      <Modal
        open={openTransferModal}
        onClose={() => setOpenTransferModal(false)}
        aria-labelledby="transfer-modal-title"
        aria-describedby="transfer-modal-description">
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}>
          <Typography id="transfer-modal-title" variant="h6" component="h2">
            Transfer Money
          </Typography>
          <Box sx={{ mt: 2 }}>
            <input
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter Amount"
              fullWidth
            />
          </Box>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={() => setOpenTransferModal(false)}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleTransfer}
              sx={{ ml: 2 }}
              disabled={!amount}>
              Transfer
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Transactions;
