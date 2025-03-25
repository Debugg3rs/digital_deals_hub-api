import config from "../utils/config.js";
import { expressjwt } from "express-jwt";
import { UserModel } from "../models/user.js";

export const isAuthuenticated = expressjwt({
  secret: config.JWT_SECRET_KEY,
  algorithms: ["HS256"],
});

export const isAuthorized = (roles) => {
  return async (req, res, next) => {
    //Find user by id
    const user = await UserModel.findById(req.auth.id);
    //Check if roles include user roles
    if (roles?.includes(user.role)) {
      next();
    } else {
      res.status(403).json({ error: "You are not authorized" });
    }
  };
};
