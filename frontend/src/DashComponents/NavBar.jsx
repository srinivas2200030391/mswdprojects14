import React, { useState, useEffect } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import { useDispatch, useSelector } from "react-redux"; // Import useSelector hook
import { setMode } from "../state1/index";
import profileImage from "../assets/profile.jpeg";
import {
  AppBar,
  Button,
  Box,
  Typography,
  IconButton,
  InputBase,
  Toolbar,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { userSlice } from "./../state/userSlice";
import { loginUser, logoutUser } from "./../state/userSlice";
import './Dashboard.css'

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const user = useSelector((state) => state.user);
  const handleLogout = () => {
    localStorage.removeItem("isCustomerLoggedIn");
    localStorage.removeItem("User");
    navigate("/");
    window.location.reload();
  };
  //   const handleLogout = () => {
  //     dispatch(logoutUser());
  //     navigate("/signin");
  //     // No need for localStorage removal or window.location.reload() if handled within your slice
  // };

  // Get user data from Redux store
  // const user = useSelector((state) => state.user.userSlice);

 const updateprofile = ()=>{
  navigate("/addprofile")
 }  
  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem">
            <input
              placeholder="Search..."
              style={{
                backgroundColor: `${theme.palette.background.alt}`,
                border: "none",
                outline: "none",
              }}
            />

            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* Display user details if logged in */}
        {user && <h3>Welcome {user.username}</h3>}

        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>

          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}>
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: theme.palette.secondary[100] }}>
                  {/* {user.username} */}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.secondary[200] }}>
                  {/* {user.occupation} */}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              // onClose={handleLogout}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
              <MenuItem onClick={handleLogout}>Log Out</MenuItem>
              <MenuItem onClick={updateprofile}>Update Profile Picture</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
