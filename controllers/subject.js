import { getCategories, getSubcategories } from "../models/subject.js";


export const _getCategories = async (req, res) => {
    try {
        const data = await getCategories();
        res.json(data);
    } catch (e) {
        console.log(e);
        res.status(404).json({ msg: e.message });
    }
};

export const _getSubcategories = async (req, res) => {
    const {catid} = req.query
    try {
        const data = await getSubcategories(catid);
        res.json(data);
    } catch (e) {
        console.log(e);
        res.status(404).json({ msg: e.message });
    }
};