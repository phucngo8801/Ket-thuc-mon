const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    throw new Error("User Already exists");
  }
});

// login
const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //kiểm tra người dùng
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      address: findUser?.address,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("invalid  credentials");
  }
});
// update a user
const updatedUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
        address: req?.body?.address,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser)
  } catch (error) {
    throw new Error(error);
  }
});

// get all users
const getallUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

//get a single user
const getUser = asyncHandler(async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  try {
    const getUser = await User.findById(id);
    res.json({ getUser });
  } catch (error) {
    throw new Error(error);
  }
});
//get a single user
const deleteUser = asyncHandler(async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  try {
    const deleteUser = await User.findByIdAndDelete(id);
    res.json({ deleteUser });
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = { createUser, loginUserCtrl, getallUser, getUser, deleteUser, updatedUser };
