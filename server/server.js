import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import trouter from "./routes/tutors.js";
import srouter from "./routes/students.js";
import subjectrouter from "./routes/subject.js";
import lrouter from "./routes/location.js";
import logoutrouter from "./routes/location.js";
import multer from 'multer';
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();

const upload = multer()
app.use(upload.array())

app.use(cors());
app.use(cookieParser());

app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.listen(process.env.PORT || 3001, () => {
    console.log(`run on port ${process.env.PORT}`);
});

app.use("/api/tutors", trouter);
app.use("/api/students", srouter);
app.use("/api/subject", subjectrouter);
app.use("/api/location", lrouter);
app.use("/api/logout", logoutrouter);
