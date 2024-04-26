import React, { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import { useDispatch, useSelector } from "react-redux";
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

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElSettings, setAnchorElSettings] = useState(null);
  const isOpen = Boolean(anchorEl);
  const isSettingsMenuOpen = Boolean(anchorElSettings);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const user = useSelector((state) => state.user);
  
  const handleLogout = () => {
    localStorage.removeItem("isCustomerLoggedIn");
    localStorage.removeItem("User");
    navigate("/");
    window.location.reload();
  };

  const handleSettingsMenuOpen = (event) => {
    setAnchorElSettings(event.currentTarget);
  };

  const handleSettingsMenuClose = () => {
    setAnchorElSettings(null);
  };

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
          <IconButton onClick={handleSettingsMenuOpen}>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>
          <Menu
            anchorEl={anchorElSettings}
            open={isSettingsMenuOpen}
            onClose={handleSettingsMenuClose}>
            <MenuItem
              onClick={() => navigate("/user-dashboard/changepassword")}>
              Change Password
            </MenuItem>
          </Menu>

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
              onClose={handleLogout}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
              <MenuItem onClick={handleLogout}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
