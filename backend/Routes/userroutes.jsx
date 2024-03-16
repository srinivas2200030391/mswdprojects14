const express = require("express");
const response = express.Router();
const users = require("../controllers/usercontroller.jsx");

response.post("/createuser", users.create);
response.post("/login", users.login);
response.get("/view/:email", users.viewbyemail);
response.delete("/delete/:id", users.deleteusers);
response.put("/Credit/", users.Credit);
response.put("/Withdrawl/", users.Withdrawl);
response.put("/editusers/:id/", users.editusers);

module.exports = response;
