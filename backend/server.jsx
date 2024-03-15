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
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected Successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.get("/", (req, res) => {
  res.send("Hello");
});
app.use("/users", userRoutes);
app.use("/admin", adminRoutes);

// app.post("/login", async (request, response) => {
//   try {
//     const s = await request.body;
//     console.log(s);
//     const id = parseInt(s["sid"]);
//     const password = s["spassword"];
//     const data = await collection.find({ sid: id }).toArray();
//     const p = bcrypt.compareSync(password, data[0].spassword);
//     if (p) {
//       console.log("Successful");
//     }
//     if (data) {
//       jwt.sign({ id, id: data._id }, secret, {}, (err, token) => {
//         if (err) throw err;
//         response.cookie("token", token).json("ok");
//       });
//     }
//   } catch (error) {
//     response.status(500).send(error.message);
//   }
// });

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server is running at port: " + PORT);
});
