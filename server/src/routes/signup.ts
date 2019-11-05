import {userModelNm, userSchema} from '../js/db'
const restful = require('node-restful')

const signup = restful.model(userModelNm, userSchema)
  .methods(['post'])

export default signup