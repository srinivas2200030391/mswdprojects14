const user = require("../models/customer.jsx");
const admin = require("../models/Admin.jsx");
const pending = require("../models/PendingModel.jsx");
const reject = require("../models/RejectedModel.jsx");
const loan = require("../models/LoanModel.jsx");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const secret = "ABCD";
const viewusers = async (req, res) => {
  try {
    const customers = await user.find({});
    console.log(customers);
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const create = async (request, response) => {
  try {
    const s = await request.body;
    const password = bcrypt.hashSync(s["password"], salt);
    s["password"] = password;

    console.log(s);

    const users = new admin(s);
    await users.save();
    response.send("Registered Successfully");
    response.status(201).json({
      msg: users,
    });
  } catch (error) {
    console.log(error.message);
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

const viewpending = async (request, response) => {
  try {
    const data = await pending.find({});
    response.send(data);
  } catch (error) {
    console.log(error.message);
  }
};

const acceptusers = async (request, response) => {
  try {
    const id = parseInt(request.params.id);
    var data = await pending.findOne({ accountnumber: id });
    const users = new user(data);
    users.isNew = true;
    await users.save();
    await pending.deleteOne({ accountnumber: id });
    response.status(200).send("Accepted Successfully");
  } catch (error) {
    response.status(500).send(error.message);
  }
};
const rejectusers = async (request, response) => {
  try {
    const id = parseInt(request.params.id);
    var data = await pending.findOne({ accountnumber: id });
    const users = new reject(data);
    users.isNew = true;
    await users.save();
    await pending.deleteOne({ accountnumber: id });
    response.status(200).send("Accepted Successfully");
  } catch (error) {
    response.status(500).send(error.message);
  }
};
const viewrejected = async (request, response) => {
  try {
    const data = await reject.find({});
    response.send(data);
  } catch (error) {
    response.status(500).send(error.message);
  }
};

const deleterejected = async (request, response) => {
  try {
    const id = parseInt(request.params.id);
    await reject.deleteOne({ accountnumber: id });
    response.status(200).send("Deleted Successfully");
  } catch (error) {
    response.status(500).send(error.message);
  }
};

const acceptrejectedusers = async (request, response) => {
  try {
    const id = parseInt(request.params.id);
    var data = await reject.findOne({ accountnumber: id });
    const users = new user(data);
    users.isNew = true;
    await users.save();
    await reject.deleteOne({ accountnumber: id });
    response.status(200).send("Accepted Successfully");
  } catch (error) {
    response.status(500).send(error.message);
  }
};

const createLoan = async (request, response) => {
  try {
    const s = await request.body;
    const users = new loan(s);
    await users.save();
    response.send("Loan Registered Successfully");
    response.status(201).json({
      msg: users,
    });
  } catch (error) {
    console.log(error.message);
  }
};
const viewloans = async (request, response) => {
  try {
    const data = await loan.find({});
    response.send(data);
  } catch (error) {
    response.status(500).send(error.message);
  }
};
const editloans = async (request, response) => {
  try {
    const users = await loan.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true }
    );
    response.send(users);
  } catch (error) {
    response.status(500).send(error.message);
  }
};

const deleteloans = async (request, response) => {
  try {
    const users = await loan.findByIdAndDelete(request.params.id);
    response.send(users);
  } catch (error) {
    response.status(500).send(error.message);
  }
};
module.exports = {
  viewusers,
  editusers,
  deleteusers,
  viewpending,
  acceptusers,
  rejectusers,
  acceptrejectedusers,
  createLoan,
  create,
  viewrejected,
  deleterejected,
  viewloans,
  editloans,
  deleteloans,
};
