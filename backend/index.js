import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import usersRouter from './routes/users.js';
import exercisesRouter from './routes/exercises.js';

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();
app.use(cors())
app.use(express.json());
let uri = process.env.DATABASE_URI;
mongoose.connect(uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,      
  }
);

const db = mongoose.connection;
db.once('open', () => {
    console.log("db connected successfully");
})

//const exercisesRouter = require('./routes/exercises'); 
//const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`server running ${port}`);
})


