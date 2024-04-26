const user = require("../models/customer.jsx");
const pending = require("../models/PendingModel.jsx");
const loan = require("../models/LoanModel.jsx");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const secret = bcrypt.hashSync("BA/4789adfafadfafa", salt);
const jwt = require("jsonwebtoken");
const multer = require('multer')
const path = require('path')
const fs = require('fs');
const TransactionModel = require("../models/Transactions.jsx");

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
}; //working

// const maketransaction = async(request,response)
// {

// }
const viewcustomers = async (request, response) => {
  try {
    const customer = await user.find();
    if (customer.length == 0) {
      response.send("DATA NOT FOUND");
    } else {
      response.json(customer);
    }
  } catch (e) {
    response.status(500).send(e.message);
  }
};

const getuserbyemail = async (request, response) => {
  try {
    const email = request.params.email;
    console.log(email);
    const userData = await user.findOne({ email });
    console.log(userData);
    response.json(userData);
    // const input = await user.find({ email });
    // console.log(input)
    // return input;
  } catch (error) {
    console.log(error.message);
    response.status(500).send(error.message);
  }
};

//using id
// const editusers = async (request, response) => {
//   try {
//     const users = await user.findByIdAndUpdate(
//       request.params.id,
//       request.body,
//       { new: true }
//     );
//     response.send(users);
//   } catch (error) {
//     response.status(500).send(error.message);
//   }
// };
//userbyaccountno



const editusers = async (request, response) => {
  try {
    const username = request.body.username;
    const email = request.body.email;
    console.log(username);

    const existingUser = await user.findOne({ username });
    if (existingUser && existingUser._id.toString() !== request.params.id) {
      console.log(existingUser);
      throw new Error("Username already exists");
    }
    const existingEmail = await user.findOne({ email });
    if (existingEmail && existingEmail._id.toString() !== request.params.id) {
      return response.status(500).send("Email already exists");
    }

    const users = await user.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true }
    );
    response.send(users);
  } catch (error) {
    return response.status(500).send(error);
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
    var data = await user.find({ accountnumber: email },{ _id: 1, balance: 1 });
    data = data[0];
    data = await user.updateOne({ _id: data._id },{ balance: data.balance + value });

    const sender = data._id;
    const reciever = email;
    const amount = value;


const newTransaction = new TransactionModel({
  sender,
  reciever,
  amount,
  
});

await newTransaction.save();
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
    var data = await user.find(
      { accountnumber: email },
      { _id: 1, balance: 1 }
    );
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

const getuserbyaccount = async (request, response) => {
  try {
    const account = request.params.account;
    const userData = await user.findOne({ accountnumber: account });
    response.json(userData);
  } catch (error) {
    console.log(error.message);
    response.status(500).send(error.message);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/'); // Destination folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // File naming convention
  }
});

const upload = multer({ storage: storage }).single('file');

const addprofile = async (req, res) =>
    {
      try 
      {
        upload(req, res, async function (err) 
        {
          if (err) 
          {
            console.error(err);
            return res.status(500).send(err.message);
          }
          
          const fileName = req.file ? req.file.filename : undefined; // Extracting file name
    
          const newFile = new user({
            file: fileName // Save only the file name
          });
    
          await newFile.save();
          res.status(200).send('Event Created Successfully');
        });
      } 
      catch (error) 
      {
        console.error(error);
        res.status(500).send(error.message);
      }
    };

module.exports = {
  create,
  viewloans,
  viewcustomers,
  getuserbyemail,
  getuserbyaccount,
  editusers,
  deleteusers,
  Credit,
  addprofile,
  Withdrawl,
};
