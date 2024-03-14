const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  aadhar: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: String,
    required: true,
    min: 18,
  },
  address: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
  photo: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    require: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.methods.generateToken = async function () {
  try {
    return jwt.signin(
      {
        _id: this._id.toString(),
        username: this.username,
        aadhar: this.aadhar,
        age: this.age,
        address: this.address,
        balance: this.balance,
        photo: this.photo,
        gender: this.gender,
        phone: this.phone,
        email: this.email,
      },
      {
        expiresIn: "1d",
      }
    );
  } catch (error) {
    console.error(error);
  }
};

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
