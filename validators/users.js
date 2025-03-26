import Joi from "joi";

export const registerUserValidator = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(6)
    .pattern(
      new RegExp(
        "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$"
      )
    )
    .message(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    )
    .required(),
  confirmPassword: Joi.ref("password"),
  role: Joi.string().valid("user", "vendor").required(),
}).with("password", "confirmPassword");

export const confirmUserEmailValidator = Joi.object({
  code: Joi.number().required(),
});

export const loginUserValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const changeUserRoleValidator = Joi.object({
  role: Joi.string().valid("user", "vendor").required(),
});

export const changeUserPasswordValidator = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string()
    .min(6)
    .pattern(
      new RegExp(
        "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$"
      )
    )
    .message(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    )
    .required(),
  confirmNewPassword: Joi.ref("newPassword"),
}).with("newPassword", "confirmNewPassword");

export const forgotPasswordValidator = Joi.object({
  email: Joi.string().email().required(),
});

export const resetPasswordValidator = Joi.object({
  code: Joi.number().required(),
  newPassword: Joi.string()
    .min(6)
    .pattern(
      new RegExp(
        "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$"
      )
    )
    .message(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    )
    .required(),
  confirmNewPassword: Joi.ref("newPassword"),
}).with("newPassword", "confirmNewPassword");


