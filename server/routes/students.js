import express from "express";
import {
    _registerStudent,
    _signInStudent,
    _getContactMessage,
    _writeContactMessage,
    _getstudent,
    _updateProfileName,
    _updateProfileEmail,
    _updateProfileDate,
    _updateProfileLocation,
    _updateProfilePassword,
    _deleteStudent
} from "../controllers/students.js";

const srouter = express.Router();

srouter.post('/register', _registerStudent);
srouter.post('/signin', _signInStudent);
srouter.get('/:id/messageboard', _getContactMessage);
srouter.post('/:id/messageboard/write', _writeContactMessage);
srouter.get('/:id/profile', _getstudent);
srouter.patch('/:id/profile/name', _updateProfileName);
srouter.patch('/:id/profile/email', _updateProfileEmail);
srouter.patch('/:id/profile/date', _updateProfileDate);
srouter.patch('/:id/profile/location', _updateProfileLocation);
srouter.patch('/:id/profile/password', _updateProfilePassword);
srouter.delete('/:id/delete', _deleteStudent);

export default srouter;