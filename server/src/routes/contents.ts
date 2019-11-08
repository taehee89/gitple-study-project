import { Request, Response, NextFunction} from 'express'
import _ from 'lodash';
import redis from 'redis'
import {contentsModelNm, contentsSchema} from '../js/db';
const restful = require('node-restful');
const client = redis.createClient(6379);

const contents = restful.model(contentsModelNm, contentsSchema)
  .methods(['get','post','put','delete'])
  .before('get', function(req: Request, res: Response, next: NextFunction ) {
    const contentRedisKey = 'content:'+req.body.user_id;
    if(req.path === '/content'){
      client.get(contentRedisKey, (err, data) => {
        const content = JSON.parse(data)
        if(content) {
          console.log('redis cache')
          res.json(content)
        } else {
          next()
        }
      })
    } else {
      next()
    }
  })
  .after('get', function(req: Request, res: Response, next: NextFunction ) {
    if(req.path === '/content'){
      console.log('search mongodb')
      const contentRedisKey = 'content:'+req.body.user_id;
      client.setex(contentRedisKey, 3, JSON.stringify(res.locals.bundle))
    }
    next();
  })

export default contents;