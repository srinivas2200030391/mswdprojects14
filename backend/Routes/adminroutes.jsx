const express = require("express");
const response = express.Router();
const admins = require("../controllers/admincontroller.jsx");
response.post("/createuser", admins.create);
response.post("/login", admins.login);
response.get("/viewusers/:email", admins.viewusers);
module.exports = response;
