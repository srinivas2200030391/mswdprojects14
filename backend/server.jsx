const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const secret = "ABCD";
const userRoutes = require("./Routes/userroutes.jsx");
const adminRoutes = require("./Routes/adminroutes.jsx");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const user = require("./models/customer.jsx");
const admin = require("./models/Admin.jsx");
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to DB Successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/users", userRoutes);
app.use("/admin", adminRoutes);

const login = async (request, response) => {
  try {
    const s = await request.body;

    const id = Object.values(s)[0];

    const password = Object.values(s)[1];
    var data = await user.find({ email: id });
    var role = "";
    if (data) {
      role = "User";
    }
    if (data.length == 0) {
      data = await admin.find({ email: id });
      if (data) {
        role = "Admin";
      }
    }

    if (data) {
      const p = bcrypt.compareSync(
        password,
        Object.values(data)[0]["password"]
      );
      if (p) {
        console.log("Successful");
        // const token = jwt.sign(
        //   { userId: data[0]._id, role: role },
        //   process.env.JWT_SECRET,
        //   { expiresIn: "1h" } // Token expires in 1 hour
        // );
        response.json({ role: role, data: data });
      }
    } else {
      response.status(500).send("Invalid Credentials");
    }
  } catch (error) {
    response.status(500).send(error.message);
  }
};
app.post("/login", login);

const changepassword = async (request, response) => {
  try {
    const { id, password, newpassword, role } = request.body;
    var user1 = "";
    if (role == "User") {
      user1 = await user.findOne({ _id: id }).select("+password");
      console.log(user1);
    }
    if (role == "Admin") {
      user1 = await admin.findOne({ _id: id }).select("+password");
      console.log(user1);
    }

    const isPasswordValid = await bcrypt.compare(password, user1["password"]);
    if (!isPasswordValid) {
      return response
        .status(400)
        .json({ message: "Current password is incorrect" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = bcrypt.hashSync(newpassword, salt);

    // Update the user's password
    user1["password"] = hashedNewPassword;
    await user1.save();

    response.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    response.status(500).json(err.message);
  }
};
app.put("/changepassword", changepassword);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server is running at port: " + PORT);
});
