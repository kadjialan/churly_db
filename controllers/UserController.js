const asyncHandler = require("express-async-handler");
const User = require("../models/userModels");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");

const authUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body
  const user = await User.findOne({email})

  if (user && (await user.matchPassword(password))) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      apikey: user.apikey,
      admin: user.admin
    })
  }else {
    res.status(401);
    throw new Error(`invalid email or password`)
  } 
}); 

const registerUser = asyncHandler(async (req, res) => {
  const {name, email, password, apikey, admin} = req.body
  
  const userExist = await User.findOne({email})

  if(userExist) {
    res.status(400)
    throw new Error(`User ${name} already exists`)
  }

   bcrypt.hash(password, 5, async function (err, hash){
    const user = await User.create({
      name, email, password: hash, apikey: uuid.v4(), admin
    })
  
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        apikey: user.apikey,
        admin: user.admin
      })
    }else {
      res.status(400);
      throw new Error(`invalid user data`)
    }
  })


});

const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "logout user" });
});

const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "user profile" });
});

const updateUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "update user profile" });
});
 
module.exports = { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile };
