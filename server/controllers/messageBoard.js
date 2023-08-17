import { getContactMessage, writeContactMessage } from "../models/messageBoard.js";

// READ - GET - get contact message
export const _getContactMessage = async (req, res) => {
    try {
        const data = await getContactMessage(req.params.id);
        res.json(data);
    } catch (e) {
        console.log(e);
        res.status(404).json({ msg: e.message });
    }
};

// WRITE - POST - write a contact message
export const _writeContactMessage = async (req, res) => {
    try {
        const data = await writeContactMessage(req.body, req.params.id);
        console.log(req.body);
        res.status(200).json({ msg: 'Your message has been sent successfully!' });
    } catch (e) {
        console.log(e);
        res.status(404).json({ msg: e.message });
    }
};