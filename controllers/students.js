import { 
    registerStudent,
    signInStudent,
    getContactMessage,
    writeContactMessage,
    getStudent,
    updateProfileName,
    updateProfileEmail,
    updateProfileDate,
    updateProfileLocation,
    updateProfilePassword,
    deleteStudent
} from "../models/students.js";
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

export const _signInStudent = async (req, res) => {
    try{
        const data = await signInStudent(req.body.email);
        // console.log(req.body.email)
        console.log(data)
        if (data.length === 0)
           return res.status(404).json({msg: 'Email not found'});
    
        const match = await bcrypt.compare(req.body.password+'', data[0].password);
           if(!match)
              return res.status(404).json({msg: 'Incorrect password'});
        // Successful login
        const {student_id, first_name, last_name, email } = data[0];
        // const email = data[0].email;
     
        const secret = process.env.ACCESS_TOKEN_SECRET;

        // Create a token
        const accessToken = jwt.sign(
            {student_id, email},
            secret,
            {expiresIn: '3600s'});
        
        res.cookie('token', accessToken, {httpOnly: true, maxAge: 3600 * 1000})

        res.json({ token: accessToken, student_id: student_id, first_name: first_name, last_name: last_name })

    } catch(e) {
        console.log(e);
        res.status(404).json({msg: 'Something went wrong'})
    };
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
        const data = await writeContactMessage(req.body);
        console.log(req.body);
        res.status(200).json({ data: data, msg: 'Your message has been sent successfully!' });
    } catch (e) {
        console.log(e);
        res.status(404).json({ msg: e.message });
    }
};

// READ - GET - get student by id
export const _getstudent = async (req, res) => {
    try {
        const data = await getStudent(req.params.id);
        res.json(data);
    } catch (e) {
        console.log(e);
        res.status(404).json({ msg: e.message });
    }
};

export const _updateProfileName = async (req, res) => {
    try {
        const data = await updateProfileName(req.body, req.params.id);
        res.status(200).json({ data: data, msg: 'Your name has been updated!' });
    } catch (e) {
        console.log(e);
        res.status(404).json({ msg: e.message });
    }
};

export const _updateProfileEmail = async (req, res) => {
    try {
        const data = await updateProfileEmail(req.body, req.params.id);
        res.status(200).json({ data: data, msg: 'Your email has been updated!' });
    } catch (e) {
        console.log(e);
        res.status(404).json({ msg: e.message });
    }
};

export const _updateProfileDate = async (req, res) => {
    try {
        const data = await updateProfileDate(req.body, req.params.id);
        res.status(200).json({ data: data, msg: 'Your date of birth has been updated!' });
    } catch (e) {
        console.log(e);
        res.status(404).json({ msg: e.message });
    }
};

export const _updateProfileLocation = async (req, res) => {
    try {
        const data = await updateProfileLocation(req.body, req.params.id);
        res.status(200).json({ data: data, msg: "Your location has been updated!" });
    } catch (e) {
        console.log(e);
        res.status(404).json({ msg: e.message });
    }
};

export const _updateProfilePassword = async (req, res) => {
    // Extract the password from req.body
    const { password } = req.body;
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password+'', salt)

    try {
        const data = await updateProfilePassword({
            // ...req.body,
            password: hash   //Use hash password
        }, req.params.id);
        console.log(req.body);
        res.status(200).json({ msg: "Your password has been updated!" });
    } catch (e) {
        console.log(e);
        res.status(404).json({ msg: e.message });
    };
};

export const _deleteStudent = async (req, res) => {
    try {
        const data = await deleteStudent(req.params.id);
        res.status(200).json({ data: data, msg: "Your account has been deleted!" });
    } catch (e) {
        console.log(e);
        res.status(404).json({ msg: e.message });
    }
};