import mongoose from 'mongoose'

const userModelNm = 'user_list'
const contentsModelNm = 'content_list'

const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  password: String
})

const contentsSchema = new mongoose.Schema({
  user_id: String,
  subject: String,
  content: String
})

export {userModelNm, contentsModelNm, userSchema, contentsSchema}