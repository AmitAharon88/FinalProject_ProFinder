import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from 'url'; 
import path from "path";
import { dirname } from 'path';
import trouter from "./routes/tutors.js";
import srouter from "./routes/students.js";
import subjectrouter from "./routes/subject.js";
import lrouter from "./routes/location.js";
import logoutrouter from "./routes/location.js";
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();

app.use(cors());
app.use(cookieParser());

app.use(express.urlencoded({extended : true}));
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.listen(process.env.PORT, () => {
    console.log(`run on port ${process.env.PORT}`);
});

app.use("/api/tutors", trouter);
app.use("/api/students", srouter);
app.use("/api/subject", subjectrouter);
app.use("/api/location", lrouter);
app.use("/api/logout", logoutrouter);

app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
