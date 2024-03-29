const express = require("express");
const response = express.Router();
const users = require("../controllers/usercontroller.jsx");

response.post("/createuser", users.create);
response.get("/viewcustomers", users.viewcustomers);
// response.get("/view/:email", users.viewbyemail);
response.get("/user/:username", users.getuserbyusername);
response.delete("/delete/:id", users.deleteusers);
response.get("/viewloans", users.viewloans);
response.put("/Credit/", users.Credit);
response.put("/Withdrawl/", users.Withdrawl);
response.post("/editusers/:id/", users.editusers);

module.exports = response;
