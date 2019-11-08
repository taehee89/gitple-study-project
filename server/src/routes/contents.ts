import _ from 'lodash';
import {contentsModelNm, contentsSchema} from '../js/db';
const restful = require('node-restful');

const contents = restful.model(contentsModelNm, contentsSchema)
  .methods(['get','post','put','delete'])

export default contents;