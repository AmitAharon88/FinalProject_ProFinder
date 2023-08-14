import express from "express";
import { _getAllTutors, _getTutor, _registerTutor, _getReviews } from "../controllers/tutors.js";

const trouter = express.Router();

trouter.get('/', _getAllTutors);
trouter.get('/:id', _getTutor);
trouter.get('/:id/reviews', _getReviews);
// trouter.post('/:id/reviews/write', _writeReview);
trouter.post('/register', _registerTutor);
// trouter.delete("/:id", _deleteTutor);

export default trouter;