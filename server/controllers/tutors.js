import { getAllTutors, getTutor, registerTutor, getReviews } from "../models/tutors.js";
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
        res.status(200).json({ msg: "Registered successfully!" });
    } catch (e) {
        console.log(e);
        res.status(404).json({ msg: e.message });
    }
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
// need to figure out how to pass the tutor and student id
export const _writeReview = async (req, res) => {
    try {
        const data = await writeReview(req.body, req.params.id);
        console.log(req.body);
        res.status(200).json({ msg: "Review added successfully!" });
    } catch (e) {
        console.log(e);
        res.status(404).json({ msg: e.message });
    }
};

