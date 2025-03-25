import config from './utils/config.js';
import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import { connect } from 'mongoose'
import userRouter from './routes/users.js';
import advertRouter from './routes/adverts.js';
import { errorHandler, unknownEndPoint } from './middlewares/errors.js';

// connect to the database
console.log('connecting to mongodb.....');
connect(config.MONGODB_URI)
  .then(() => console.log('Connected to Mongodb'));

// initiate express app
const app = express();

// middleware
app.use(cors());
app.use(express.json());


// register user route
app.use('/api/v1', userRouter);

// register user route
app.use('/api/v1', advertRouter);

// error handler middlewares
app.use(unknownEndPoint);

app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`server is running on port ${config.PORT}`);
});