import passport from 'passport';
import User from '../../models/user';
import kakao from '../passport/kakaoStrategy';



export default function passports() {
    passport.serializeUser((user, done) => {
        done(null, user._id);
    })

    passport.deserializeUser((_id, done) => {
        User.findOne({ where: { _id } })
            .then(user => done(null, user))
            .catch(err => done(err))
    })
    kakao();
}
