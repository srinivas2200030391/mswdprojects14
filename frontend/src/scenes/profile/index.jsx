import React, { useState, useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import Header from '../../DashComponents1/Header';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import axios from 'axios';

const Profile = (props) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [updatedUserData, setUpdatedUserData] = useState({});

  const handleInputChange = (e) => {
    setUpdatedUserData({ ...updatedUserData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveChanges = async () => {
    try {
      const userEmail = localStorage.getItem("userEmail")
      const response = await axios.put(`http://localhost:2014/users/editusers`,updatedUserData);
      console.log(response.data)
      setUserData(updatedUserData); // Update the local state with the updated data
      handleClose();
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {

    // Load user data from localStorage
    const userEmail = localStorage.getItem("userEmail")
    if(userEmail){
      axios.get(`http://localhost:2014/users/getuserbyemail/${userEmail}`).then(response =>{
        setUserData(response.data)
      }).catch(error =>{
        console.error("Error fetching user details:",error);
      })
    }
  }, []);

  useEffect(() => {
    // Save user data to localStorage whenever it changes
    const fetchUserData = async()=>{
      try{
        const userEmail = localStorage.getItem("userEmail")
        if(userEmail)
        {
          const response = await axios.get(`http://localhost:2014/users/getuserbyemail/${userEmail}`)
          setUserData(response.data)
          console.log(response.data)
        }
      }
      catch(error)
      {
        console.log(error.message)
      }
    }
    fetchUserData();
  }, []);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Profile" />

      {/* Profile Editing Modal */}
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
              Update User Details
            </h2>
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
              <label htmlFor="Aadhar">Aadhar:</label>
              <input
                type="text"
                id="aadhar"
                name="Aadhar"
                value={updatedUserData.aadhar || ""}
                onChange={handleInputChange}
              />
            </div>
            <div style={{ width: "170%" }}>
              <label htmlFor="age">Age:</label>
              <input
                type="text"
                id="age"
                name="age"
                value={updatedUserData.age || ""}
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
              }}
            >
              Save Changes
            </button>
          </div>
        </Box>

      </Modal>

      {/* Profile Display */}
      <Box mt="40px">
        <h2>Name: {userData.username}</h2>
        <p>Email: {userData.email}</p>
        <p>Phone: {userData.phone}</p>
        <p>Aadhar: {userData.aadhar}</p>
        <p>Age: {userData.age}</p>

        {/* Button to trigger profile update */}
        <Button variant="contained" color="primary" onClick={handleUpdate}>
          Update Profile
        </Button>
      </Box>
    </Box>
  );
};

export default Profile;
