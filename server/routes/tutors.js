import express from "express";
import { _getAllTutors, _getTutor, _searchTutorsByCategory, _searchTutorsBySubcategory, _searchTutorsByLocation, _deleteTutor } from "../controllers/tutors.js";

const trouter = express.Router();

trouter.get('/', _getAllTutors);
trouter.get('/:id', _getTutor);
trouter.get('/search_by_category',_searchTutorsByCategory);
trouter.get('/search_by_subcategory',_searchTutorsBySubcategory);
trouter.get('/search_by_location',_searchTutorsByLocation);
trouter.delete("/:id", _deleteTutor);

export default trouter;