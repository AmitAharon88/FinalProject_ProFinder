import { getLocation } from "../models/location.js";

export const _getLocation = async (req, res) => {
    try {
        const data = await getLocation();
        res.json(data);
    } catch (e) {
        console.log(e);
        res.status(404).json({ msg: e.message });
    }
};