import { Router } from "express";
import {
  changeUserRole,
  getAllUsers,
  getUser,
  loginUser,
  registerUser,
} from "../controllers/users.js";
import { isAuthorized, isAuthuenticated } from "../middlewares/auth.js";

//create router
const userRouter = Router();

//Define routes
userRouter.post("/users/register", registerUser);
userRouter.get("/users", getAllUsers);
userRouter.get("/users/:id", getUser);
userRouter.post("/users/login", loginUser);
userRouter.patch(
  "/users/:id",
  isAuthuenticated,
  isAuthorized(["superadmin"]),
  changeUserRole
);

export default userRouter;
