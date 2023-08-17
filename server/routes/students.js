import express from "express";
import { _registerStudent, _signInStudent, _getContactMessage, _writeContactMessage } from "../controllers/students.js";

const srouter = express.Router();

srouter.post('/register', _registerStudent);
srouter.post('/signin', _signInStudent);
srouter.get('/:id/messageboard', _getContactMessage);
srouter.post('/:id/messageboard/write', _writeContactMessage);
// srouter.delete('/logout', _logoutStudent);

export default srouter;