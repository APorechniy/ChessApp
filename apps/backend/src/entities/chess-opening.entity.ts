import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('chess_openings')
export class ChessOpening {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: "varchar", length: 100 })
    name!: string;
}