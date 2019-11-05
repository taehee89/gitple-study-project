import {contentsModelNm, contentsSchema} from '../js/db'
const restful = require('node-restful')

const write = restful.model(contentsModelNm, contentsSchema)
  .methods(['get','post','put','delete'])

export default write