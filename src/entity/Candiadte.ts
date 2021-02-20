import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Candidate {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    slogan: string;

    @Column()
    age: number;

    @Column()
    votes: number;

    @Column({ nullable: true })
    update_at: string;

    @Column()
    create_at: string;
}
