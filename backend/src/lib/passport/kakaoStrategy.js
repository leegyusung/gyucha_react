import passport from 'passport';
import { Strategy } from 'passport-kakao';

import User from '../../models/user';

export default function kakaoStrategy() {
    passport.use(new Strategy({
        clientID: process.env.CLIENT_KEY,
        callbackURL: '/api/auth/kakao/callback',
    }, async (accessToken, refreshToken, profile, done) => {
        console.log('kakao profile', profile);
        try {
            const exUser = await User.findOne({
                password: profile.id
            }).exec();

            if (exUser) {

                done(null, exUser);

            } else {
                const newUser = new User({
                    username: profile.username,
                    password: profile.id,
                    provider: profile.provider,
                });
                await newUser.save();

                done(null, newUser);
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }))
};
