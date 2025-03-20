import config from './utils/config.js';
import express from 'express'
import { connect } from 'mongoose'

// connect to the database
console.log('connecting to mongodb.....');
connect(config.MONGODB_URI)
  .then(() => console.log('Connected to Mongodb'));

// initiate express app
const app = express();




app.listen(config.PORT, () => {
  console.log(`server is running on port ${config.PORT}`);
});