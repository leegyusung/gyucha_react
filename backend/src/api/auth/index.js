import express from 'express';
import * as authCtrl from './auth';
import { verifyToken } from '../../lib/jwtmiddle';

const auth = express.Router();

auth.post('/register', authCtrl.register);
auth.post('/login', authCtrl.login);
auth.get('/', verifyToken, authCtrl.getUsers);
auth.get('/logout', authCtrl.logout);

export default auth;