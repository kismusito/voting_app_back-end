import express from "express";
import {
    getCandidate,
    getCandidates,
    setVote,
    createCandidateList,
} from "../controllers/candidate.controller";
const router = express.Router();

router
    .get("/user/:id", getCandidate)
    .get("/users", getCandidates)
    .post("/createCandidates", createCandidateList)
    .put("/user/setVote", setVote);

export default router;
