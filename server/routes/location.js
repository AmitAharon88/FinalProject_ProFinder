import express from "express";
import { _getLocation } from "../controllers/location.js";

const lrouter = express.Router();

lrouter.get('/', _getLocation);

export default lrouter;