import { Router } from "express";
import {
  changeUserPassword,
  changeUserRole,
  confirmNewUserEmail,
  forgotPassword,
  getAllUsers,
  getAuthenticatedUser,
  getUser,
  loginUser,
  registerUser,
  resetPassword,
} from "../controllers/users.js";
import { isAuthorized, isAuthuenticated } from "../middlewares/auth.js";

//create router
const userRouter = Router();

//Define routes
userRouter.post("/users/register", registerUser);

userRouter.post("/users/activate-account", confirmNewUserEmail);

userRouter.get(
  "/users",
  isAuthuenticated,
  isAuthorized(["superadmin"]),
  getAllUsers
);

userRouter.get(
  "/users/me",
  isAuthuenticated,
  isAuthorized(["user", "vendor", "superadmin"]),
  getAuthenticatedUser
);

userRouter.get(
  "/users/:id",
  isAuthuenticated,
  isAuthorized(["superadmin"]),
  getUser
);

userRouter.post("/users/login", loginUser);

userRouter.patch(
  "/users/change-password",
  isAuthuenticated,
  isAuthorized(["user", "vendor", "superadmin"]),
  changeUserPassword
);

userRouter.patch("/users/forgot-password", forgotPassword);

userRouter.patch("/users/reset-password", resetPassword);

userRouter.patch(
  "/users/:id",
  isAuthuenticated,
  isAuthorized(["superadmin"]),
  changeUserRole
);

export default userRouter;
