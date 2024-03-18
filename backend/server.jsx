const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./Routes/userroutes.jsx");
const adminRoutes = require("./Routes/adminroutes.jsx");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to DB Successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/users", userRoutes);
app.use("/admin", adminRoutes);


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server is running at port: " + PORT);
});
