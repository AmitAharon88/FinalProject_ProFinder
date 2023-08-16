import express from "express";
import { _contact } from "../controllers/contact.js";

const crouter = express.Router();

crouter.get('/', _contact);

export default crouter;