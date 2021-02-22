import { Response, Request } from "express";
import { getRepository } from "typeorm";
import { Candidate } from "../entity/Candidate";

// Only discomment this for create all candidates, also discomment line
import { createCandidates } from "../helpers/createCandidates";

export const getCandidates = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const candidates = await getRepository(Candidate).find();
        return res.status(200).json({
            status: true,
            candidates,
        });
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error,
        });
    }
};

export const getCandidate = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const candidateID = req.params["id"];
    if (candidateID) {
        const candidate = await getRepository(Candidate).findOne(candidateID);
        if (candidate) {
            return res.status(200).json({
                status: true,
                candidate,
            });
        } else {
            return res.status(400).json({
                status: false,
                message: "The candidate not exist.",
            });
        }
    } else {
        return res.status(400).json({
            status: false,
            message: "The candidate ID is required.",
        });
    }
};

type UpdatedCandidateVotesType = {
    status: number;
    data: {};
};

async function updateCandidate(
    id: number,
    total: number
): Promise<UpdatedCandidateVotesType> {
    try {
        const candidate = await getRepository(Candidate).findOne(id);
        if (candidate) {
            const newVotes = candidate.votes + total;
            if (newVotes <= 20 && newVotes >= 0) {
                getRepository(Candidate).merge(candidate, {
                    votes: newVotes,
                    update_at: new Date().toString(),
                });
                const newCandidate = await getRepository(Candidate).save(
                    candidate
                );
                return {
                    status: 200,
                    data: {
                        status: true,
                        message: "Candidate updated successfully.",
                        candidate: newCandidate,
                    },
                };
            } else {
                return {
                    status: 200,
                    data: {
                        status: false,
                        message: "The number of votes of each candidate is 20",
                    },
                };
            }
        } else {
            return {
                status: 404,
                data: {
                    status: false,
                    message: "The candidate does not exist.",
                },
            };
        }
    } catch (error) {
        return {
            status: 400,
            data: {
                status: false,
                message: "There was an unknown error.",
            },
        };
    }
}

export const setVote = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const { candidateID, symbol } = req.body;
    if (candidateID && symbol) {
        // This way to evaluate if is more or less votes if to simplyfi and no create more endpoints
        const totalVotes = symbol === "+" ? 1 : -1;

        const candidateUpdated = await updateCandidate(candidateID, totalVotes);

        // Candidate updated return the status and data for return to user
        return res.status(candidateUpdated.status).json(candidateUpdated.data);
    } else {
        return res.status(400).json({
            status: false,
            message: "The candidate ID is required.",
        });
    }
};

export const createCandidateList = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        // This functipo create candidades
        await createCandidates(20);

        return res.status(200).json({
            status: true,
            message: "Candidates was created successfully.",
        });
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error,
        });
    }
};
