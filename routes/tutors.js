import express from "express";
import {
    _getAllTutors,
    _getTutor,
    _registerTutor,
    _signInTutor,
    _getReviews,
    _writeReview,
    _getContactMessage,
    _writeContactMessage,
    _updateProfileName,
    _updateProfileEmail,
    _updateProfileDate,
    _updateProfileLocation,
    _updateProfileEducation,
    _updateProfileAbout,
    _updateProfileCategory,
    _addProfileCategory,
    _deleteProfileCategory,
    _updateProfilePassword,
    _deleteTutor
} from "../controllers/tutors.js";

const trouter = express.Router();

trouter.get('/', _getAllTutors);
trouter.get('/:id', _getTutor);
trouter.get('/:id/reviews', _getReviews);
trouter.post('/signin', _signInTutor);
trouter.post('/:id/reviews/write', _writeReview);
trouter.post('/:id/messageboard/write', _writeContactMessage);
trouter.get('/:id/messageboard', _getContactMessage);
trouter.post('/register', _registerTutor);

trouter.get('/:id/profile', _getTutor);
trouter.patch('/:id/profile/name', _updateProfileName);
trouter.patch('/:id/profile/email', _updateProfileEmail);
trouter.patch('/:id/profile/date', _updateProfileDate);
trouter.patch('/:id/profile/location', _updateProfileLocation);
trouter.patch('/:id/profile/education', _updateProfileEducation);
trouter.patch('/:id/profile/about', _updateProfileAbout);
trouter.patch('/:id/profile/catsubcat', _updateProfileCategory);
trouter.post('/:id/profile/catsubcat/add', _addProfileCategory);
trouter.delete('/:id/profile/catsubcat/delete/:tutor_cat_id', _deleteProfileCategory);
trouter.patch('/:id/profile/password', _updateProfilePassword);

trouter.delete('/:id/delete', _deleteTutor);

export default trouter;