import express from "express";
import { upload } from "../utils/upload.js";
import { _uploadSingle } from "../controllers/upload.js";

export const frouter = express.Router();

frouter.post("/", upload.single("file"), _uploadSingle);
frouter.get("/", (req, res) => {
    res.send('OK')
});

export default frouter;