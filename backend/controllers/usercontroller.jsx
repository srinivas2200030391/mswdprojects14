const user = require("../models/customer.jsx");
const admin = require("../models/Admin.jsx");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const secret = bcrypt.hashSync("BA/4789adfafadfafa", salt);
const jwt = require("jsonwebtoken");


const generateAccountNumber = ()=>{
  const accountnumber = Math.floor(100000000000 +Math.random()*900000000000).toString();
  return accountnumber
}
const create = async (request, response) => {
  try {
    const s = await request.body;
    const password =  bcrypt.hashSync(s["password"], salt);
    s["password"] = password;
    const account_number = generateAccountNumber();
    console.log(s);
    const userData = {...s,accountnumber:account_number}
    const users = new user(userData);
    await users.save();
    response.send("Registered Successfully")
    response.status(201).json({
      msg: users,
      // token: users.methods.generateToken(),
      // userId: users._id.toString(),
    });
  } catch (error) {
    console.log(error.message);
  }
};//working

const viewcustomers = async (request,response)=>{
  try{
    const customer = await user.find();
    if(customer.length==0)
    {
      response.send("DATA NOT FOUND");
    }
    else
    {
      response.json(customer)
    }
  }
  catch(e)
  {
    response.status(500).send(e.message)
  }
}
const viewadmins = ()=>{
  
}
// const generateToken = (user) => {
//   return jwt.sign(user, "secret_key", { expiresIn: "1h" });
// }
// const verifytoken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   if (!authHeader) 
//   {
//       return res.status(401).send("Access Denied");
//   }
//   const token = authHeader.split(' ')[1]; // For Removing 'Bearer' prefix
//   jwt.verify(token, "secret_key", (err, decoded) => 
//   {
//       if (err) 
//       {
//           return res.status(403).send("Invalid Token");
//       }
//       req.user = decoded;
//       next();
//   });
// }


const login = async (request, response) => {
  try {
    const { email, password } = request.body;
    
    let data = await user.findOne({ email });
    
    if (data) {
      const isPasswordValid = bcrypt.compareSync(password, data.password);
      if (isPasswordValid) {
        console.log("Successful");
        console.log(email)
        response.json("Login successful");
      } else {
        response.status(401).send("Invalid email or password");
      }
    } else {
      response.status(401).send("Invalid email or password");
    }
  
  } catch (error) {
    response.status(500).send(error.message);
  }
};//working
 


//userdata 
const getuserbyusername = async (username) => {
  try {
    const input  = await user.findOne({ username });
    return input;
  } catch (error) {
    throw new Error("Error fetching user details");
  }
};
// const getuserbyusername=async (request,response)=>{
//   const {username} = request.params
//   try {
//     const u = await user.findOne({username})
//     if(!u)
//     {
//       return response.status(404).json({message:"User Not Found"})
//     }
//     response.status(200).json(u)
//   }
//   catch(e)
//   {
//     console.log(e.message)
//     response.status(500).json({message:"Internal Server Error"})
//   }
// }

//transaction controller 
// const transfermoney = async (senderno,recieverno,amount)=>{
//   try{
//     const 
//   }
// }

// const login = async (request,response)=>{
//   try{
//       const input = request.body
//       console.log(input)
//       const users = await user.findOne(input)
//       response.json(users)
//   }
//   catch(e)
//   {
//       response.status(500).send(e.message)
//   }
// }

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

module.exports = {
  create,
  login,
  // viewbyemail,
  viewcustomers,
  getuserbyusername,
  editusers,
  deleteusers,
  Credit,
  Withdrawl,
};
