import registerUserValidator from "../validators/users.js";

import bcrypt from "bcrypt";

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
    return res.status(409).json("User already exists!");
  }

  // Hash plaintext password using asynchronous method
  const hashedPassword = await bcrypt.hash(value.password, 12);

  // Create User record in database
  const result = await UserModel.create({
    ...value,
    password: hashedPassword,
  });
  // Return response
  res.status(201).json("User registered successfully");
};

//Get all users  controller
export const getAllUsers = async (req, res) => {
  //Fetch all users from the database
  const allUsers = await UserModel.find();
  if (!allUsers) {
    return res.status(404).json({ message: "No users found!" });
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
    return res.status(404).json({ message: "User does not exist!" });
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
    return res.status(404).json("User does not exist!");
  }

  //Compare incoming password with saved password
  const correctPassword = bcrypt.compareSync(value.password, user.password);
  if (!correctPassword) {
    return res.status(401).json("Invalid Credentials!");
  }
  //Generate access token for user

  const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "24h",
  });
  //Return response
  res.status(200).json({ accessToken });
};

//Update a user controller
export const updateUser = async (req, res) => {
  //Validate request body
  const { error, value } = updateUserValidator.validate(req.body);
  if (error) {
    return res.status(422).json(error);
  }
  //Update user in database
  const result = await UserModel.findByIdAndUpdate(req.params.id, value, {
    new: true,
  });
  //return response
  res.status(200).json(result);
};
