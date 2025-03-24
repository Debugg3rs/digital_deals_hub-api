import {
  registerUserValidator,
  loginUserValidator,
  changeUserRoleValidator,
} from "../validators/users.js";
import { UserModel } from "../models/user.js";
import config from "../utils/config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//Register a user controller
export const registerUser = async (req, res) => {
  // Validate user information
  const { error, value } = registerUserValidator.validate(req.body);
  if (error) {
    return res.status(422).json(error);
  }

  // Check if user does not exist already
  const user = await UserModel.findOne({ email: value.email });
  if (user) {
    return res.status(409).json({ error: "User already exists!" });
  }

  // Hash plaintext password using asynchronous method
  const hashedPassword = await bcrypt.hash(value.password, 12);

  // Create User record in database
  const result = await UserModel.create({
    ...value,
    password: hashedPassword,
  });
  // Return response
  res.status(201).json({ message: "User registered successfully" });
};

//Get all users  controller
export const getAllUsers = async (req, res) => {
  //Fetch all users from the database
  const allUsers = await UserModel.find();
  if (!allUsers) {
    return res.status(404).json({ error: "No users found!" });
  }
  //return response
  res
    .status(200)
    .json({ message: "All users fetched successfully", users: allUsers });
};

//Fetch a specific user from the database
export const getUser = async (req, res) => {
  //Validate the id input field of the user
  const singleUser = await UserModel.findById(req.params.id);

  if (!singleUser) {
    return res.status(404).json({ error: "User does not exist!" });
  }
  //return response
  res
    .status(200)
    .json({ message: "User fetched successfully", user: singleUser });
};

//Login a user controller
export const loginUser = async (req, res) => {
  //Validate user information
  const { error, value } = loginUserValidator.validate(req.body);
  if (error) {
    return res.status(422).json(error);
  }

  //Find matching user record in database
  const user = await UserModel.findOne({ email: value.email });
  if (!user) {
    return res.status(404).json({ error: "User does not exist!" });
  }

  //Compare incoming password with saved password
  const correctPassword = bcrypt.compareSync(value.password, user.password);
  if (!correctPassword) {
    return res.status(401).json({ error: "Invalid Credentials!" });
  }
  //Generate access token for user

  const accessToken = jwt.sign({ id: user.id }, config.JWT_SECRET_KEY, {
    expiresIn: "24h",
  });
  //Return response
  res.status(200).json({
    accessToken,
    user: { id: user.id, role: user.role, name: user.name },
  });
};

//Change user role controller
export const changeUserRole = async (req, res) => {
  //Validate request body
  const { error, value } = changeUserRoleValidator.validate(req.body);
  if (error) {
    return res.status(422).json(error);
  }
  //check if user exists
  const user = await UserModel.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User not found!" });
  }
  console.log(value);
  //Update user role in database
  const result = await UserModel.findByIdAndUpdate(req.params.id, value, {
    new: true,
  });
  //return response
  res.status(200).json(result);
};
