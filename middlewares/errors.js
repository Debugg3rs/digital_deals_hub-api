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
  logger.info(`${err.name}: ${err.message}`);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // Mongoose duplicate key error
  if (err.name === "MongoServerError" && err.code === 11000) {
    const value = Object.keys(err.keyValue)[0];
    err.message = `expected \`${value}\` to be unique`;
    err.statusCode = 400;
  }

  // if (err.code === 11000) {

  //   const value = err.message.match(/(["'])(\\?.)*?\1/)[0]
  //   err.message = `Duplicate field value: ${value}. Please use another value`
  //   err.statusCode = 400
  // }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((val) => val.message);
    err.message = `Invalid input data. ${errors.join(". ")}`;
    err.statusCode = 400;
  }

  // Mongoose CastError (invalid ID)
  if (err.name === "CastError") {
    err.message = `malformatted id: ${err.value}`;
    err.statusCode = 400;
  }

  // Missing or invalid token
  if (err.name === "JsonWebTokenError") {
    err.message = "token invalid";
    err.statusCode = 401;
  }

  // express-jwt errors
  if (err.code === "credentials_required") {
    err.message = "Authorization token is required";
    err.statusCode = 401;
  }

  if (err.inner.name === "TokenExpiredError" || err.code === "invalid_token") {
    err.message = "JWT token expired";
    err.statusCode = 401;
  }

  // express-jwt errors
  if (err.name === "ForbiddenError") {
    err.message = "Access denied";
    err.statusCode = 403;
  }

  



  // express-jwt errors

  // expired token
  if (err.name === "TokenExpiredError") {
    err.message = "token expired";
    err.statusCode = 401;
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
