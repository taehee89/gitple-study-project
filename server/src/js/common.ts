import express from 'express'
import bcrypt from 'bcrypt'

// password hash
const hash_password = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(req.body.password)
    bcrypt.hash(req.body.password, 10, (err: Error, encrypted: string):void => {
        if(err) throw err
        else{
        req.body.password = encrypted
        next()
        }
    })
}

export default hash_password