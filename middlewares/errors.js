import config from "../utils/config.js";
import logger from "../utils/logger.js";

const requestLogger = (req, res, next) => {
  logger.info("Method", req.method);
  logger.info("Path", req.path);
  logger.info("Body", req.body);
  logger.info("___");

  next();
};

export const unknownEndPoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

export const errorHandler = (err, req, res, next) => {
  logger.info(`${err?.name}: ${err.message}`);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const value = Object.keys(err.keyValue)[0];
    err.message = `expected \`${value}\` to be unique`;
    err.statusCode = 400;
  }else if (err.name === "ValidationError") {
    // Mongoose validation error
    const errors = Object.values(err.errors).map((val) => val.message);
    err.message = `Invalid input data. ${errors.join(". ")}`;
    err.statusCode = 400;
  }else if (err.name === "CastError") {
    // Mongoose CastError (invalid ID)
    err.message = `malformatted id: ${err.value}`;
    err.statusCode = 400;
  }else if (err.name === "JsonWebTokenError") {
    // Missing or invalid token
    err.message = "token invalid";
    err.statusCode = 401;
  }else if (err.code === "credentials_required") {
    // express-jwt errors
    err.message = "Authorization token is required";
    err.statusCode = 401;
  }else if (err?.inner?.name === "TokenExpiredError" || err.code === "invalid_token") {
    err.message = "JWT token expired";
    err.statusCode = 401;
  }else if (err.name === "ForbiddenError") {
    // express-jwt errors
    err.message = "Access denied";
    err.statusCode = 403;
  }else if (err.name === "ReferenceError") {
    err.message = err.message;
    err.statusCode = 400;
  }

  // Test error response
  if (config.NODE_ENV === "test") {
    return res.status(err.statusCode).json({
      status: err.status,
      message: { error: err.message },
    });
  }

  // Development error response
  if (config.NODE_ENV === "development") {
    return res.status(err.statusCode).json({
      status: err.status,
      message: { error: err.message },
      error: err,
      stack: err.stack,
    });
  }

  // Production error response
  if (config.NODE_ENV === "production") {
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }

  next(err);
};
