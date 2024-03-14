const express = require("express");
const response = express.Router();
const users = require("../controllers/userController.jsx");

response.get("/:id", users.viewusers);

response.get("/updateuser/:id", users.updateuser);
response.post("/createuser", users.create);
response.post("/login", users.login);
response.get("/view/:email", users.viewbyemail);
response.delete("/delete/:id", users.deleteusers);
response.put("/updateBalance/", users.updateBalance);
response.post("/forgot", async (req, res) => {
  try {
    await users.sendEmail(
      "2200030391@kluniversity.in",
      "Hello from Node.js",
      "This is a test email sent from Node.js!"
    );
    res.status(200).send("Email sent successfully");
  } catch (error) {
    res.status(500).send("Error sending email");
  }
});
module.exports = response;
