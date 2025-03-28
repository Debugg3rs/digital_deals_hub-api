import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.js";
import config from "../utils/config.js";
import {
  changeUserPasswordValidator,
  changeUserRoleValidator,
  confirmUserEmailValidator,
  forgotPasswordValidator,
  loginUserValidator,
  registerUserValidator,
  resetPasswordValidator,
} from "../validators/users.js";
import { mailCode, mailCodeExpires, sendMail } from "../utils/mail.js";
import logger from "../utils/logger.js";

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
    mailCode,
    mailCodeExpires
  });


  // Send eamil confirmation code
  sendMail(result, "Expense Tracker - Activate your account", "verify");

  // For development use only
  if (config.NODE_ENV === "development") {
    logger.info("-------- ACTIVATE ACCOUNT --------");
    logger.info(`Email: ${result.email}`);
    logger.info(`Confirmation code: ${mailCode}`);
    // console.log(`Reset URL: ${resetUrl}`);
    logger.info("-------------------------------------");
  }

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
  const singleUser = await UserModel
    .findById(req.params.id);

  if (!singleUser) {
    return res.status(404).json({ error: "User does not exist!" });
  }
  //return response
  res
    .status(200)
    .json({ message: "User fetched successfully", user: singleUser });
};

// Get authenticated user
export const getAuthenticatedUser = async (req, res) => {
  const user = await UserModel.findById(req.auth.id);
  if (!user) {
    return res.status(404).json({error: "User not found"});
  }

  res.status(200).json(user);
}


//Login a user controller
export const loginUser = async (req, res) => {
  //Validate user information
  const { error, value } = loginUserValidator.validate(req.body);
  if (error) {
    return res.status(422).json(error);
  }

  //Find matching user record in database
  const user = await UserModel
    .findOne({ email: value.email })
    .select("name role password");
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
    expiresIn: config.JWT_VALIDITY,
  });
  //Return response
  res.status(200).json({
    accessToken,
    user: { 
      id: user.id,
      role: user.role,
      name: user.name,
      isAuthuenticated: true
    },
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
  
  //Update user role in database
  const result = await UserModel.findByIdAndUpdate(req.params.id, value, {
    new: true,
  });
  //return response
  res.status(200).json(result);
};

// Change user password
export const changeUserPassword = async (req, res) => {
  const { error, value } = changeUserPasswordValidator.validate(req.body);
  if (error) {
    return res.status(422).json(error);
  }
  const { currentPassword, newPassword } = value;
  const userId = req.auth.id;

  const user = await UserModel.findById(userId, "password");

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const passwordCorrect = await bcrypt.compare(currentPassword, user.password);

  if (!passwordCorrect) {
    return res.status(401).json({ error: "Current password incorrect" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);
  await UserModel.findByIdAndUpdate(userId, { password: hashedPassword });

  res.status(200).json({ message: "Password changed successfully" });
}

// email confirmation
export const confirmNewUserEmail  = async(req, res) => {
  const { error, value } = confirmUserEmailValidator.validate(req.body);
  if (error) {
    return res.status(422).json(error);
  }

  // find user
  const user = await UserModel.findOne({
    mailCode: value.code,
    mailCodeExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ error: "Invalid or expired code" });
  }
  // future consideration
  // Allow users to regenerate code if code expires

  user.mailCode = null;
  user.mailCodeExpires = null;
  user.verified = true
  await user.save();

  res.status(200).json({message: "Account activated successfully"});
}


// Forgot password
export const forgotPassword = async (req, res) => {
  const { error, value} = forgotPasswordValidator.validate(req.body);
  if (error) {
    return res.status(422).json(error);
  }
  // Check if user exists
  const user = await UserModel.findOne({ email: value.email });
  if (!user) {
    // For security reasons, still return success even if user doesn't exist
    return res
      .status(200)
      .json({
        message:
          "If your email exists in our system, you will receive reset code",
      });
  }

  // Update user record in database
  await UserModel.findByIdAndUpdate(
    user.id,
    {
      mailCode: mailCode,
      mailCodeExpires: mailCodeExpires
    }
  );

  await sendMail(
    user,
    "Expense Tracker - Reset your password",
    "reset",
  );

  if (config.NODE_ENV === "development") {
    console.log("-------- PASSWORD RESET INFO --------");
    console.log(`Email: ${value.email}`);
    console.log(`Reset Token: ${mailCode}`);
    // console.log(`Reset URL: ${resetUrl}`);
    console.log("-------------------------------------");
  }

  res.status(200).json({
    message:
      "If your email exists in our system, you will receive reset code",
  });
}

// Reset password
export const resetPassword = async (req, res) => {
  const { error, value } = resetPasswordValidator.validate(req.body);

  if (error) {
    return res.status(422).json(error);
  }

  // find user
  const user = await UserModel.findOne({
    mailCode: value.code,
    mailCodeExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ error: "Invalid or expired code" });
  }
  // future consideration
  // Allow users to regenerate code if code expires

  // Hash the provided password
  const hashedPassword = bcrypt.hashSync(value.newPassword, 12);

  // Update user record in database with new password and reset token fields
  await UserModel.findByIdAndUpdate(user.id, {
    password: hashedPassword,
    mailCode: null,
    mailCodeExpires: null,
  });

  res.status(200).json({ message: "Password reset successfully" });
}
