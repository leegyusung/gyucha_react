require('dotenv').config();
import express from 'express';
import morgan from 'morgan';
import api from '../src/api/index'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser';
import passportConfig from './lib/passport/index';
import passport from 'passport';
import session from 'express-session';

const app = express();
passportConfig();
const { PORT, MONGO_URI } = process.env;
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected MongoDB')
    })
    .catch((err) => {
        console.log(err)
    })

app.use(session({
    secret: 'secret',
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use('/api', api);

const port = PORT || 4000;
app.listen(port, () => {
    console.log(`${port} 포트 사용중`);
})


