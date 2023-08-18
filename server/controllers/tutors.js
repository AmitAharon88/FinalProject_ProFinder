import { getAllTutors, getTutor, registerTutor, signInTutor, getReviews, writeReview, getContactMessage, writeContactMessage } from "../models/tutors.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// READ - GET - get all tutors
export const _getAllTutors = async (req, res) => {
    try {
        const data = await getAllTutors();
        res.json(data);
    } catch (e) {
        console.log(e);
        res.status(404).json({ msg: e.message });
    }
};

// READ - GET - get tutor by id
export const _getTutor = async (req, res) => {
    try {
        const data = await getTutor(req.params.id);
        res.json(data);
    } catch (e) {
        console.log(e);
        res.status(404).json({ msg: e.message });
    }
};

export const _registerTutor = async (req, res) => {
    // Extract the password from req.body
    const { password } = req.body;
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password+'', salt)

    try {
        const data = await registerTutor({
            ...req.body,
            password: hash   //Use hash password
        });
        console.log(req.body);
        res.status(200).json({ msg: "Registered successfully!"});
    } catch (e) {
        console.log(e);
        res.status(404).json({ msg: e.message });
    }
};

export const _signInTutor = async (req, res) => {
    try{
        const data = await signInTutor(req.body.email);
        // console.log(req.body.email)
        console.log(data)
        if (data.length === 0)
           return res.status(404).json({msg: 'Email not found'});
    
        const match = await bcrypt.compare(req.body.password+'', data[0].password);
           if(!match)
              return res.status(404).json({msg: 'Incorrect password'});
        // Successful login
        const {tutor_id, first_name, last_name, email } = data[0];
     
        const secret = process.env.ACCESS_TOKEN_SECRET;

        // Create a token
        const accessToken = jwt.sign(
            {tutor_id, email},
            secret,
            {expiresIn: '1hr'});
        
        res.cookie('token', accessToken, {httpOnly: true, maxAge: 3600 * 1000})

        res.json({ token: accessToken, tutor_id: tutor_id,first_name: first_name, last_name: last_name })

    } catch(e) {
        console.log(e);
        res.status(404).json({msg: 'Something went wrong'})
    };
};
    

// export const _deleteTutor = async (req, res) => {
//     try {
//         const data = await deleteTutor(req.params.tutor_id)
//         res.json(data);
//     } catch (e) {
//         console.log(e);
//         res.status(404).json({ msg: e.message });
//     }
// };

// READ - GET - get reviews
export const _getReviews = async (req, res) => {
    try {
        const data = await getReviews(req.params.id);
        res.json(data);
    } catch (e) {
        console.log(e);
        res.status(404).json({ msg: e.message });
    }
};

// WRITE - POST - write a review
export const _writeReview = async (req, res) => {
    try {
        const data = await writeReview(req.body, req.params.id);
        console.log(req.body);
        res.status(200).json(data);
    } catch (e) {
        console.log(e);
        res.status(404).json({ msg: e.message });
    }
};

// READ - GET - get contact message
export const _getContactMessage = async (req, res) => {
    try {
        const data = await getContactMessage(req.params.id);
        res.json(data);
    } catch (e) {
        console.log(e);
        res.status(404).json({ msg: e.message });
    }
};

// WRITE - POST - write a contact message
export const _writeContactMessage = async (req, res) => {
    try {
        const data = await writeContactMessage(req.body, req.params.id);
        console.log(req.body);
        res.status(200).json({ data: data, msg: 'Your message has been sent successfully!' });
    } catch (e) {
        console.log(e);
        res.status(404).json({ msg: e.message });
    }
};