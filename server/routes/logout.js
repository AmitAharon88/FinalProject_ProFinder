import express from "express";
import { _logout } from "../controllers/students.js";

const logoutrouter = express.Router();

logoutrouter.delete('/', _logout);

export default logoutrouter;
