import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  useTheme,
  Button,
  Container,
} from "@mui/material";
import Header from "../../DashComponents1/Header";
import Modal from "@mui/material/Modal";
import axios from "axios";
import config from "../../config.jsx";
const Profile = (props) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [updatedUserData, setUpdatedUserData] = useState({});
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setUpdatedUserData({ ...updatedUserData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    setUpdatedUserData(userData);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveChanges = async () => {
    try {
      const user = localStorage.getItem("User");
      const id = JSON.parse(user)[0]._id;
      const response = await axios.put(
        `${config.baseURL}/users/editusers/${id}`,
        updatedUserData
      );
    
      handleClose();
      window.location.reload();
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    // Load user data from localStorage
    const user = localStorage.getItem("User");
    const userEmail = JSON.parse(user)[0].email;
    if (userEmail) {
      axios
        .get(`${config.baseURL}/users/getuserbyemail/${userEmail}`)
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    }
  }, []);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Profile"/>

      {/* Profile Editing Mo dal */}
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
          <div>
            <h2
              style={{
                padding: "20px",
                textAlign: "center",
                transform: "translateX(50pt)",
              }}>
              Update User Details
            </h2>
            <div style={{ width: "170%" }}>
              <label htmlFor="fullname">Full Name:</label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={updatedUserData.fullname || ""}
                onChange={handleInputChange}
              />
            </div>
            <div style={{ width: "170%", fontWeight: "bolder" }}>
              <label htmlFor="username">UserName:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={updatedUserData.username || ""}
                onChange={handleInputChange}
              />
            </div>
            <div style={{ width: "170%" }}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={updatedUserData.email || ""}
                onChange={handleInputChange}
              />
            </div>
            <div style={{ width: "170%" }}>
              <label htmlFor="phone">Phone:</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={updatedUserData.phone || ""}
                onChange={handleInputChange}
              />
            </div>
            <div style={{ width: "170%" }}>
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={updatedUserData.address || ""}
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

            <p>{error || ""}</p>
          </div>
        </Box>
      </Modal>

      {/* Profile Display */}
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
          marginTop: "-60pt",
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
                component="img"
                src={userData.photo}
                gutterBottom
                sx={{
                  fontFamily: "Roboto, sans-serif",
                  color: theme.palette.secondary.main,
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                  padding: "1pt 0 10pt 0",
                  width:"90px",
                }}>
                
              </Typography>
              <Typography
                variant="h3"
                component="div"
                gutterBottom
                sx={{
                  fontFamily: "Roboto, sans-serif",
                  color: theme.palette.secondary.main,
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                  padding: "10pt 0 10pt 0",
                }}>
                {userData.username}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: "bold",
                  color: theme.palette.text.primary,
                  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
                  padding: "10pt 0 10pt 0",
                }}>
                Full Name: {userData.fullname}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: "bold",
                  color: theme.palette.text.primary,
                  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
                  padding: "10pt 0 10pt 0",
                }}>
                Email: {userData.email}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: "bold",
                  color: theme.palette.text.primary,
                  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
                  padding: "10pt 0 10pt 0",
                }}>
                Phone: {userData.phone}
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: "bold",
                  color: theme.palette.text.primary,
                  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
                  padding: "10pt 0 10pt 0",
                }}>
                Aadhar: {userData.aadhar}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: "bold",
                  color: theme.palette.text.primary,
                  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
                  padding: "10pt 0 10pt 0",
                }}>
                Age: {userData.age}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: "bold",
                  color: theme.palette.text.primary,
                  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
                  padding: "10pt 0 10pt 0",
                }}>
                Address: {userData.address || "Yet to Be Updated"}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: "bold",
                  color: theme.palette.text.primary,
                  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
                  padding: "10pt 0 10pt 0",
                }}>
                Account Number: {userData.accountnumber}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: "bold",
                  color: theme.palette.text.primary,
                  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
                  padding: "10pt 0 10pt 0",
                }}>
                Balance: {userData.balance}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: "bold",
                  color: theme.palette.text.primary,
                  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
                  padding: "10pt 0 10pt 0",
                }}>
                Gender: {userData.gender}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>

      {/* Button to trigger profile update */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: -7.5,
          transform: "translateX(-50pt)",
        }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdate}
          sx={{
            fontSize: "1rem",
            padding: "8px 8px",
            boxShadow:
              "0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)",
          }}>
          Update Profile
        </Button>
      </Box>
    </Box>
  );
};

export default Profile;
