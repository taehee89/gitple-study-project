import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

const auth = function (req: Request, res: Response, next: NextFunction) {
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
            req.body.user_id = user._id;
            next();
        });
    })(req, res, next);
};

export default auth;