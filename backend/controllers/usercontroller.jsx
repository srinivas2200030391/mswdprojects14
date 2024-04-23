const user = require("../models/customer.jsx");
const pending = require("../models/PendingModel.jsx");
const loan = require("../models/LoanModel.jsx");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const secret = bcrypt.hashSync("BA/4789adfafadfafa", salt);
const jwt = require("jsonwebtoken");

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

const getuserbyemail = async (request, response) => 
{
  try {
    const email = request.params.email;
    console.log(email);
    const userData = await user.findOne({email});
    console.log(userData)
    response.json(userData)
    // const input = await user.find({ email });
    // console.log(input)
    // return input;
  }
   catch (error) {
    console.log(error.message);
    response.status(500).send(error.message)
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

const editusers = async (request,response)=>{
  try{
    const userEmail = request.params.email;
    const updatedUserData = request.body

    const updatedUser = await user.findOneAndUpdate({email:userEmail},updatedUserData,{new:true});

    if(updatedUser)
    {
      response.send(updatedUser)
    }
    else{
      response.status(404).send("User Not Found")
    }
  }
  catch(error)
  {
    response.status(500).send(error.message)
    }
}

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
  viewcustomers,
  getuserbyemail  ,
  editusers,
  deleteusers,
  Credit,
  Withdrawl,
};
