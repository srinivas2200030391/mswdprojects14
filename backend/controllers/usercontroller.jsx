const user = require("../models/customer.jsx");
const admin = require("../models/Admin.jsx");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const secret = bcrypt.hashSync("BA/4789adfafadfafa", salt);
const jwt = require("jsonwebtoken");
const viewusers = async (request, response) => {
  try {
    const data = await user.find({});
    response.send(data);
  } catch (error) {
    console.log(error.message);
  }
};
const viewbyemail = async (request, response) => {
  try {
    const email = request.params.email;
    console.log(email);
    const data = await user.find({ email: email });
    if (!data) return response.status(404).send("No User Found!");
    else {
      response.send(data);
    }
  } catch (error) {
    response.status(500).send("hello");
  }
};

const updateuser = async (request, response) => {
  try {
    const s = request.body;
    const t = { ...s };
    console.log(t);
    const data = await user.updateMany(
      { email: email },
      { $set: { sname: "Srinu" } }
    );
    response.send(data);
  } catch (error) {
    console.log(error.message);
  }
};
const create = async (request, response) => {
  try {
    const s = await request.body;
    const password = bcrypt.hashSync(s["password"], salt);
    s["password"] = password;
    console.log(s);
    const users = new user(s);
    await users.save();
    response.status(201).json({
      msg: users,
      token: users.methods.generateToken(),
      userId: users._id.toString(),
    });
  } catch (error) {
    console.log(error.message);
  }
};
const login = async (request, response) => {
  try {
    const s = await request.body;
    console.log(s);
    console.log(Object.values(s)[0]);
    const id = Object.values(s)[0];
    const password = Object.values(s)[1];
    let data = await user.find({ email: id });
    var role = "user";
    if (!data) {
      data = await admin.find({ email: id });
      if (data) {
        role = "admin";
      }
    }
    if (data) {
      const p = bcrypt.compareSync(
        password,
        Object.values(data)[0]["password"]
      );
      if (p) {
        console.log("Successful");
        jwt.sign({ id, id: data._id }, secret, {}, (err, token) => {
          if (err) throw err;
          console.log(token);
          response.cookie("token", token).json(role);
        });
      }
    } else {
      response.status(500).send("Invalid Credentials");
    }
  } catch (error) {
    response.status(500).send(error.message);
  }
};
const editusers = async (request, response) => {
  try {
    const users = await user.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true }
    );
    response.send(users);
  } catch (error) {
    response.status(500).send(error.message);
  }
};
const deleteusers = async (request, response) => {
  try {
    const users = await user.findByIdAndDelete(request.params.id);
    response.send(users);
  } catch (error) {
    response.status(500).send(error.message);
  }
};

// emailController.js
const nodemailer = require("nodemailer");

// Create a transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "vasus4990@gmail.com",
    pass: "imxokehribgnizlt",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Function to send an email
async function sendEmail(to, subject, text) {
  try {
    const mailOptions = {
      from: "vasus4990@gmail.com",
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // Propagate the error to the caller
  }
}

const updateBalance = async (request, response) => {
  try {
    const s = request.body;
    const email = Object.values(s)[0];
    const value = parseInt(Object.values(s)[1]);
    const data = await user.find(
      { email: email },
      { $set: { balance: balance + value } }
    );
    response.send("Updated");
  } catch (error) {
    response.status(500).send(error.message);
  }
};

module.exports = {
  viewusers,
  updateuser,
  create,
  login,
  viewbyemail,
  editusers,
  deleteusers,
  sendEmail,
  updateBalance,
};
