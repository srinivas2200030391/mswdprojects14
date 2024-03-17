const user = require("../models/customer.jsx");
const pending = require("../models/PendingModel.jsx");
const loan = require("../models/LoanModel.jsx");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const secret = "ABCD";
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
    response.status(500).send(error.message);
  }
};
const generateAccountNumber = () => {
  const accountnumber = Math.floor(
    100000000000 + Math.random() * 900000000000
  ).toString();
  return accountnumber;
};
const create = async (request, response) => {
  try {
    const s = await request.body;
    const password = bcrypt.hashSync(s["password"], salt);
    s["password"] = password;
    const account_number = generateAccountNumber();
    console.log(s);
    const userData = { ...s, accountnumber: account_number };
    const users = new pending(userData);
    await users.save();
    response.send("Registered Successfully");
    response.status(201).json({
      msg: users,
    });
  } catch (error) {
    console.log(error.message);
  }
};
// const login = async (request, response) => {
//   try {
//     const s = await request.body;
//     console.log(s);
//     console.log(Object.values(s)[0]);
//     const id = Object.values(s)[0];
//     const password = Object.values(s)[1];
//     let data = await user.find({ email: id });
//     var role = "user";
//     if (!data) {
//       data = await admin.find({ email: id });
//       if (data) {
//         role = "admin";
//       }
//     }
//     if (data) {
//       const p = bcrypt.compareSync(
//         password,
//         Object.values(data)[0]["password"]
//       );
//       if (p) {
//         console.log("Successful");
//         jwt.sign({ id, id: data._id }, secret, {}, (err, token) => {
//           if (err) throw err;
//           console.log(token);
//           response.cookie("token", token).json(role);
//         });
//       }
//     } else {
//       response.status(500).send("Invalid Credentials");
//     }
//   } catch (error) {
//     response.status(500).send(error.message);
//   }
// };
// const login = async (request, response) => {
//   try {
//     const { email, password } = request.body;

//     let data = await user.findOne({ email });

//     if (data) {
//       const isPasswordValid = bcrypt.compareSync(password, data.password);
//       if (isPasswordValid) {
//         console.log("Successful");
//         response.json("Login successful");
//       } else {
//         response.status(401).send("Invalid email or password");
//       }
//     } else {
//       response.status(401).send("Invalid email or password");
//     }
//   } catch (error) {
//     response.status(500).send(error.message);
//   }
// };

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

const Credit = async (request, response) => {
  try {
    const s = request.body;
    console.log(s);
    const email = Object.values(s)[0];
    const value = parseInt(Object.values(s)[1]);
    var data = await user.find({ email: email }, { _id: 1, balance: 1 });
    data = data[0];
    data = await user.updateOne(
      { _id: data._id },
      { balance: data.balance + value }
    );
    console.log(data);
    response.send("Updated");
  } catch (error) {
    response.status(500).send(error.message);
  }
};
const Withdrawl = async (request, response) => {
  try {
    const s = request.body;
    console.log(s);
    const email = Object.values(s)[0];
    const value = parseInt(Object.values(s)[1]);
    var data = await user.find({ email: email }, { _id: 1, balance: 1 });
    data = data[0];
    if (data.balance < value) {
      return response.json("Insufficient Balance");
    } else {
      data = await user.updateOne(
        { _id: data._id },
        { balance: data.balance - value }
      );
      console.log(data);
      response.send("Updated");
    }
  } catch (error) {
    response.status(500).send(error.message);
  }
};

const viewloans = async (request, response) => {
  try {
    const data = await loan.find();
    if (!data) return response.status(404).send("No Loan Found!");
    else {
      response.send(data);
    }
  } catch (error) {
    response.status(500).send(error.message);
  }
};

module.exports = {
  create,
  viewloans,
  viewbyemail,
  editusers,
  deleteusers,
  Credit,
  Withdrawl,
};
