import { Router } from "express";
import {
  getAllUsers,
  getUser,
  loginUser,
  registerUser,
  updateUser,
} from "../controllers/users.js";

//create router
const userRouter = Router();

//Define routes
userRouter.post("/users/register", registerUser);
userRouter.get("/users", getAllUsers);
userRouter.get("/users/:id", getUser);
userRouter.post("/users/login", loginUser);
userRouter.patch("/users/:id", updateUser);

export default userRouter;
