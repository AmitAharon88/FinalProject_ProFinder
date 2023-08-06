import express from "express";
import { _getCategories, _getSubcategories } from "../controllers/subject.js";

const subjectrouter = express.Router();

subjectrouter.get('/categories', _getCategories);
subjectrouter.get('/subcategories', _getSubcategories);

export default subjectrouter;