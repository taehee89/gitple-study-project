import express from 'express'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import dotEnv from 'dotenv'
dotEnv.config()

const create = function (req: express.Request, res: express.Response) {
    passport.authenticate('jwt', {session: false}, (err, user) => {
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
            // jwt.sign('token내용', 'JWT secretkey')
            const token = jwt.sign(user.toJSON(), 'gitple');
            return res.json({user});
        });
    })(req, res);
};

export default create