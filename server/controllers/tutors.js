import { getAllTutors, getTutor, searchTutorsByCategory, searchTutorsBySubcategory, searchTutorsByLocation, deleteTutor } from "../models/tutors.js";

// READ - GET - get all tutors
export const _getAllTutors = async (req, res) => {
    try {
        const data = await getAllTutors();
        res.json(data);
    } catch (e) {
        console.log(e);
        res.status(404).json({ msg: e.message });
    }
};

// READ - GET - get tutor by id
export const _getTutor = async (req, res) => {
    try {
        const data = await getTutor(req.params.id);
        res.json(data);
    } catch (e) {
        console.log(e);
        res.status(404).json({ msg: e.message });
    }
};

// SEARCH
export const _searchTutorsByCategory = async (req, res) => {
    try {
        const data = await searchTutorsByCategory(req.query.category_name);
        res.json(data);
    } catch (e) {
        console.log(e);
        res.status(404).json({ msg: e.message });
    }
};

export const _searchTutorsBySubcategory = async (req, res) => {
    try {
        const data = await searchTutorsBySubcategory(req.query.subcategory_name);
        res.json(data);
    } catch (e) {
        console.log(e);
        res.status(404).json({ msg: e.message });
    }
};

export const _searchTutorsByLocation = async (req, res) => {
    try {
        const data = await searchTutorsByLocation(req.query.location_name);
        res.json(data);
    } catch (e) {
        console.log(e);
        res.status(404).json({ msg: e.message });
    }
};


export const _deleteTutor = async (req, res) => {
    try {
        const data = await deleteTutor(req.params.tutor_id)
        res.json(data);
    } catch (e) {
        console.log(e);
        res.status(404).json({ msg: e.message });
    }
};
  

