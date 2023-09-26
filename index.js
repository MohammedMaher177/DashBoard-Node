
import dotenv from "dotenv";

dotenv.config();
import express from "express";
import cors from "cors";
import { bootstrap } from "./src/app.routes.js";
import cookieParser from "cookie-parser";

const app = express();
const port = 5000; 

app.use(cors());
app.use(cookieParser())
app.use(express.json());

bootstrap(app)

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
