import {modelNm, userSchema} from '../js/db'
const restful = require('node-restful')

const signup = restful.model(modelNm, userSchema)
  .methods(['post'])

export default signup