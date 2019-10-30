import express from 'express'
import morgan from 'morgan'
import methodOverride from 'method-override'
import mongoose from 'mongoose'
import passport from 'passport'
import dotEnv from 'dotenv'
dotEnv.config()

import passportCfg from './js/passport'
import signup from './routes/signup'
import create from './js/authToken';
import user from './js/user';

const app = express()

app.use(morgan('dev'))  // logging
app.use(express.urlencoded({'extended': false})) // request translate
app.use(express.json())
app.use(methodOverride()) // restful method
app.use(enableCORS) // Cross Origin Resource Sharing
app.use(passport.initialize())  // passport initialize

// moongodb connect
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/test_user', { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(e => console.error(e));

signup.register(app, '/signup') // sign up

passportCfg()

app.post('/signin', create); // sign in
app.get('/user', user); // select user info

// listen server
app.listen(process.env.SERVER_PORT, () => {
  console.log('listening server! ' + process.env.SERVER_PORT)
})

function enableCORS(req: express.Request, res: express.Response, next: express.NextFunction){
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  next()
}