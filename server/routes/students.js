import express from "express";
import { _registerStudent, _signInStudent } from "../controllers/students.js";

const srouter = express.Router();

srouter.post('/register', _registerStudent);
srouter.post('/signin', _signInStudent);
// srouter.delete('/logout', _logoutStudent);

export default srouter;