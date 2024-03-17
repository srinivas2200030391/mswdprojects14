const express = require("express");
const response = express.Router();
const admins = require("../controllers/admincontroller.jsx");
response.get("/viewusers/:email", admins.viewusers);
module.exports = response;
