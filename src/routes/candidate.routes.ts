import express from "express";
import {
    getCandidate,
    getCandidates,
    setVote,
    createCandidateList,
} from "../controllers/candidate.controller";
const router = express.Router();

router
    .get("/candidate/:id", getCandidate)
    .get("/candidates", getCandidates)
    .post("/candidate/createCandidates", createCandidateList)
    .put("/candidate/setVote", setVote);

export default router;
