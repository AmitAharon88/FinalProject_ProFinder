import { registerStudent, signIn } from "../models/students.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const _registerStudent = async (req, res) => {
    // Extract the password from req.body
    const { password } = req.body;
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password+'', salt)

    try {
        const data = await registerStudent({
            ...req.body,
            password: hash   //Use hash password
        });
        console.log(req.body);
        res.status(200).json({ msg: "Registered successfully!" });
    } catch (e) {
        console.log(e);
        res.status(404).json({ msg: e.message });
    };
};

export const _signIn = async (req, res) => {
    try{
        const data = await signIn(req.body.email.toLowerCase());
        // console.log(req.body.email.toLowerCase())
        console.log(data)
        if (data.length === 0)
           return res.status(404).json({msg: 'email not found'});
    
        const match = await bcrypt.compare(req.body.password+'', data[0].password);
           if(!match)
              return res.status(404).json({msg: 'wrong password'});
        // Successful login
        const userid = data[0].id;
        const email = data[0].email;
     
        const secret = process.env.ACCESS_TOKEN_SECRET;

        // Create a token
        const accessToken = jwt.sign(
            {userid, email},
            secret,
            {expiresIn: '60s'});
        
        res.cookie('token', accessToken, {httpOnly: true, maxAge: 60 * 1000})

        res.json({ token: accessToken })

    } catch(e) {
        console.log(e);
        res.status(404).json({msg: 'Something went wrong!!'})
    };
};