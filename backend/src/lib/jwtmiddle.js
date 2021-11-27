require("dotenv").config();
import jwt from 'jsonwebtoken';
const { ACCESS_TOKEN_SECRET } = process.env;


export const generateAccessToken = _id => {
    return jwt.sign({ _id }, ACCESS_TOKEN_SECRET, {
        expiresIn: '15m'
    })
}

export const verifyToken = (req, res, next) => {
    try {
        const clientToken = req.cookies.user;
        const decoded = jwt.verify(clientToken, ACCESS_TOKEN_SECRET);
        console.log(decoded);
        if (decoded) {
            res.locals.user = decoded._id;
            next();
        } else {
            res.status(401).json({ error: 'unauthorized' });
        }
    } catch (error) {
        res.status(401).json({ error: 'token expired' });
    }
}