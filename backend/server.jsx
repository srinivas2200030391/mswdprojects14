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

// app.get("/", (req, res) => {
//   res.send("Hello");
// });
// app.get("/hello", (req, res) => {
//   res.send("Hello People");
// });
app.use("/users", userRoutes);
app.use("/admin", adminRoutes);

const login = async (request, response) => {
  try {
    const s = await request.body;
    const id = Object.values(s)[0];
    console.log(s);
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
        jwt.sign({ id, id: data._id }, secret, {}, (err, token) => {
          if (err) throw err;
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
app.post("/login", login);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server is running at port: " + PORT);
});
