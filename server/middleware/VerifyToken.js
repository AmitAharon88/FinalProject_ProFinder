import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { signIn } from '../models/students.js';

dotenv.config();

export const VerifyToken = (req, res, next) => {
    // Get the name of the cookie from either the token
    const accessToken = req.cookies.token;
    console.log('my token:', accessToken);

    // see if we have a token
    if (!accessToken) return res.status(401).json({msg: 'unauthorized'});
    // verify the token
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET), (err, decoded) => {
        if (err) return res.status(403).json({msg: 'verify token failed'});
    
    // decoded is the payload
    console.log('decoded:', decoded);

    };
};