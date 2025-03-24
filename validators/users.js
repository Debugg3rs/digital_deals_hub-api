import Joi from "joi";

export const registerUserValidator = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(6)
    .pattern(
      new RegExp(
        "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
      )
    )
    .message(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    )
    .required(),
  confirmPassword: Joi.ref("password"),
  role: Joi.string().valid("user", "vendor", "superadmin").required(),
}).with("password", "confirmPassword");

export const loginUserValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const changeUserRoleValidator = Joi.object({
  role: Joi.string().valid("user", "vendor", "superadmin").required(),
});
