import express from 'express'
import passport from 'passport';
import jwt from 'jsonwebtoken'
import dotEnv from 'dotenv'
dotEnv.config()

const SECRET_KEY: string = process.env.SECRET_KEY + '';

const auth = function (req: express.Request, res: express.Response, next: express.NextFunction) {
    passport.authenticate('jwt', {session: false}, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right!!!',
                user   : user
            });
        }
        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }
            // jwt.sign('token내용', 'JWT secretkey')
            req.body.user_id = user._id
            next()
        });
    })(req, res, next);
};

export default auth;