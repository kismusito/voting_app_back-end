import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import CandidateRoute from "./routes/candidate.routes";
import { createConnection } from "typeorm";

const app = express();
createConnection();

app.use(helmet());
app.use(cors());
app.use(morgan("combined"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", CandidateRoute);

export default app;
