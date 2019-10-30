import mongoose from 'mongoose'

const modelNm = 'user_list'
const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  password: String
})

export {modelNm, userSchema}