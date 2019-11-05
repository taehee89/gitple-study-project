import passport from 'passport';
import passportJwt from 'passport-jwt';
import passpostLocal from 'passport-local';
import mongoose from 'mongoose'
import {userModelNm, userSchema} from '../js/db'
import dotEnv from 'dotenv'
dotEnv.config()

const LocalStrategy = passpostLocal.Strategy;
const JWTStrategy = passportJwt.Strategy;
const ExtractJWT = passportJwt.ExtractJwt;

const db = mongoose.model(userModelNm, userSchema);

const passportCfg = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    async function (email: string, password: string, done) {
        try {
            const user = await db.findOne({ email: email, password: password });
            if (!user) {
                return done(null, false, { message: 'Incorrect email or password.' });
            }
            return done(null, user, { message: 'Logged In Successfully' });
        }
        catch (err) {
            return done(err);
        }

    }
    ));

    passport.use(new JWTStrategy({
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey   : process.env.SECRET_KEY
        },
        async function (jwtPayload, done) {
            try {
                const user = await db.findById(jwtPayload._id);
                return done(null, user);
            }
            catch (err) {
                return done(err);
            }
        }
    ));
}

export default passportCfg