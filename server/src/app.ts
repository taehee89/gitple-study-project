import express from 'express'
import morgan from 'morgan'
import methodOverride from 'method-override'
import mongoose from 'mongoose'
import passport from 'passport'
import dotEnv from 'dotenv'
dotEnv.config()

import user from './js/user'

const app = express()

app.use(morgan('dev'))
app.use(express.urlencoded({'extended': true}))
app.use(express.json())
app.use(methodOverride())
app.use(passport.initialize())

app.use(express.urlencoded({'extended': true}))
app.use(express.json())
app.use(methodOverride())

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/test_user', { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(e => console.error(e));

user.register(app, '/user')

app.listen(process.env.SERVER_PORT, () => {
  console.log('listening server! ' + process.env.SERVER_PORT)
})