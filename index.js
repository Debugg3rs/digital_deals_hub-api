import config from './utils/config.js';
import express from 'express'
import cors from 'cors'
import { connect } from 'mongoose'
import userRouter from './routes/users.js';

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


app.listen(config.PORT, () => {
  console.log(`server is running on port ${config.PORT}`);
});