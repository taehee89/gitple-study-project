import express from 'express'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import dotEnv from 'dotenv'
dotEnv.config()

const SECRET_KEY: string = process.env.SECRET_KEY + '';

const create = function (req: express.Request, res: express.Response) {
    passport.authenticate('local', {session: false}, (err, user) => {
        if (err || !user) {
            console.log(err)
            return res.status(400).json({
                message: 'Something is not right',
                user   : user
            });
        }
        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }
            // jwt.sign('token', 'JWT secretkey')
            const token = jwt.sign(user.toJSON(), SECRET_KEY);
            return res.json({token});
        });
    })(req, res);
};

export default create