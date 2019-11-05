import express from 'express';
import morgan from 'morgan';
import methodOverride from 'method-override';
import cors from 'cors';
import mongoose from 'mongoose';
import passport from 'passport';
import dotEnv from 'dotenv';
dotEnv.config();

import passportCfg from './js/passport';
import signup from './routes/signup';
import write from './routes/contents';
import signin from './js/authToken';
import auth from './js/auth';

const app = express();

var corsOptions = {
  'origin': '*',
  'methods': "GET,PUT,POST,DELETE",
  'allowedHeaders': ['Content-Type, Authorization'],
  'preflightContinue': false,
  'optionsSuccessStatus': 204
}

app.use(morgan('dev'));  // logging
app.use(express.urlencoded({'extended': false})); // request translate
app.use(express.json());
app.use(methodOverride()); // restful method
app.use(cors(corsOptions)) // Cross Origin Resource Sharing
app.use(passport.initialize());  // passport initialize

// moongodb connect
const MONGO_URI: string = process.env.MONGO_URI + '';
mongoose.Promise = global.Promise;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(e => console.error(e));

passportCfg();

signup.register(app, '/signup') // sign up
app.post('/signin', signin); // sign in

app.use(auth);

write.register(app, '/content'); // write contents

// listen server
app.listen(process.env.SERVER_PORT, () => {
  console.log('listening server! ' + process.env.SERVER_PORT)
})