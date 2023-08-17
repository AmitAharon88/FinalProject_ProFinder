import express from "express";
import { _getAllTutors, _getTutor, _registerTutor, _signInTutor, _getReviews, _writeReview, _getContactMessage, _writeContactMessage } from "../controllers/tutors.js";
// import { _getContactMessage, _writeContactMessage } from "../controllers/messageBoard.js";

const trouter = express.Router();

trouter.get('/', _getAllTutors);
trouter.get('/:id', _getTutor);
trouter.get('/:id/reviews', _getReviews);
trouter.post('/signin', _signInTutor);
trouter.post('/:id/reviews/write', _writeReview);
trouter.post('/:id/messageboard/write', _writeContactMessage);
trouter.get('/:id/messageboard', _getContactMessage);
trouter.post('/register', _registerTutor);

export default trouter;