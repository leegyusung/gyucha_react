import express from 'express';
import * as authCtrl from './auth';
import passport from 'passport';
import { verifyToken } from '../../lib/jwtmiddle';

const auth = express.Router();

auth.post('/register', authCtrl.register);
auth.post('/login', authCtrl.login);
auth.get('/', verifyToken, authCtrl.getUsers);
auth.get('/logout', authCtrl.logout);
auth.get('/kakao', passport.authenticate('kakao'));
auth.get('/kakao/callback', passport.authenticate('kakao'), authCtrl.kakao);

export default auth;