import faker from "faker";
import { getConnection, getRepository } from "typeorm";
import { Candidate } from "../entity/Candiadte";

type CandidateInterface = {
    firstname: string;
    lastname: string;
    slogan: string;
    age: number;
    votes: number;
    update_at: string;
    create_at: string;
};

const createCandidate = (): CandidateInterface => {
    return {
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        slogan: faker.lorem.paragraph(),
        age: faker.random.number({
            min: 18,
            max: 80,
        }),
        votes: faker.random.number({
            min: 0,
            max: 10,
        }),
        update_at: new Date().toString(),
        create_at: new Date().toString(),
    };
};

/**
 * This funcion clean all entities from the database
 */
export async function clearEntities() {
    const entities = await getConnection().entityMetadatas;

    for (const entity of entities) {
        const repository = await getConnection().getRepository(entity.name);
        await repository.clear();
    }
}

/**
 *
 * @param n Number of candidates to create
 */
export async function createCandidates(n: number = 20) {
    try {
        clearEntities();
        for (let i = 0; i < n; i++) {
            let candidateFake = createCandidate();
            const candidate = getRepository(Candidate).create(candidateFake);
            await getRepository(Candidate).save(candidate);
        }

        console.log("Candidates created successfully");
    } catch (error) {
        console.log(error);
    }
}
