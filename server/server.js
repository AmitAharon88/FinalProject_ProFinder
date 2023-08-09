import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import trouter from "./routes/tutors.js";
import subjectrouter from "./routes/subject.js";
import lrouter from "./routes/location.js";
import multer from 'multer';

const app = express();
dotenv.config();

const upload = multer()
app.use(upload.array())

app.use(cors());

app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.listen(process.env.PORT || 3001, () => {
    console.log(`run on port ${process.env.PORT}`);
});

app.use("/api/tutors", trouter);
app.use("/api/subject", subjectrouter);
app.use("/api/location", lrouter);
