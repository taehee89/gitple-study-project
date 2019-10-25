import express from 'express'
import mongoose from 'mongoose'
const restful = require('node-restful')
import bcrypt from 'bcrypt'

const modelNm = 'user_list'
const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  pw: String
})

const user = restful.model(modelNm, userSchema)
  .methods(['get', 'post', 'put', 'delete'])
  .before('post', hash_password)
  .before('put', hash_password)

  // password hash
  function hash_password(req: express.Request, res: express.Response, next: express.NextFunction) {
    bcrypt.hash(req.body.pw, 10, (err: Error, encrypted: string):void => {
      if(err) throw err
      else{
        req.body.pw = encrypted
        next()
      }
    })
  }

export default user