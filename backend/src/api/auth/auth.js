import { generateAccessToken } from '../../lib/jwtmiddle';
import User from '../../models/user';
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const exist = await User.findOne({ username: username }).exec();
        if (exist) return res.status(400).json({
            result: '존재하는 유저입니다.'
        });

        const hash = await bcrypt.hash(password, 10)
        const user = new User({
            username: username,
            password: hash,
            provider: 'local'
        })
        await user.save();
        return res.json(user);
    } catch (error) {
        return res.json(error);
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password)
    try {
        const exist = await User.findOne({ username: username }).exec();
        if (exist) {
            const decode = await bcrypt.compare(password, exist.password);
            if (!decode) return res.status(400).send("비밀번호가 일치 하지 않습니다.");;
            const acesstoken = generateAccessToken(exist._id);
            res.cookie('access_token', acesstoken);
            res.cookie('user', exist);
            return res.status(200).json({
                result: exist,
                acesstoken
            });
        }
        return res.status(400).send("존재하지 않는 유저입니다.");

    } catch (error) {
        return res.json(error);
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie('access_token', '');
        res.cookie('user', '');
        return res.json('로그아웃 성공');
    } catch (error) {
        return res.json(error);
    }

}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find().exec();
        return res.json(users);
    } catch (error) {
        return res.json(error);
    }

}

export const kakao = async (req, res) => {
    console.log(req.user);
    res.cookie('user', req.user);
    return res.redirect('http://localhost:3000/');
}