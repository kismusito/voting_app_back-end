import express from "express";
import {
    getCandidate,
    getCandidates,
    setVote,
    createCandidateList,
} from "../controllers/candidate.controller";
const router = express.Router();

router
    .get("/cantidate/:id", getCandidate)
    .get("/cantidates", getCandidates)
    .post("/cantidate/createCandidates", createCandidateList)
    .put("/cantidate/setVote", setVote);

export default router;
