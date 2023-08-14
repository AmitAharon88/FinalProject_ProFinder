import express from "express";
import { _registerStudent, _signIn } from "../controllers/students.js";

const srouter = express.Router();

srouter.post('/register', _registerStudent);
srouter.post('/signin', _signIn);

export default srouter;