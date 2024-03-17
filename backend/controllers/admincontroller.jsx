const user = require("../models/customer.jsx");
const admin = require("../models/Admin.jsx");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const secret = bcrypt.hashSync("BA/4789adfafadfafa", salt);
const jwt = require("jsonwebtoken");
const viewusers = async (request, response) => {
  try {
    const data = await admin.find({});
    response.send(data);
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

module.exports = {
  viewusers,
  editusers,
  deleteusers,
};
