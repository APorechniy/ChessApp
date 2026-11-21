import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { sqlToUtc, utcToSql } from "../utils/utc-to-sql";
import { localToUtc } from "@/utils/local-to-utc";

export enum HomeworkSolutionStatus {
    New = 'new',
    InProgress = 'in_progress',
    Solved = 'solved',
    Checked = 'checked',
}

@Entity('homework_solutions')
export class HomeworkSolution {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ name: "student_id", type: "varchar", length: 36 })
    studentId!: string;

    @Column({ name: "homework_id", type: "varchar", length: 36 })
    homeworkId!: string;

    @Column({
        name: "status",
        type: "enum",
        enum: HomeworkSolutionStatus,
        default: HomeworkSolutionStatus.New,
    })
    status!: HomeworkSolutionStatus;

    @Column({
        name: "started_at",
        type: "timestamp",
        nullable: true,
        transformer: {
            to: (value: string | null): string | null =>
                value === null ? null : utcToSql(localToUtc(value)),
            from: (value: string | null): string | null =>
                value === null ? null : sqlToUtc(value),
        },
    })
    startedAt!: string | null;

    @Column({
        name: "finished_at",
        type: "timestamp",
        nullable: true,
        transformer: {
            to: (value: string | null): string | null =>
                value === null ? null : utcToSql(localToUtc(value)),
            from: (value: string | null): string | null =>
                value === null ? null : sqlToUtc(value),
        },
    })
    finishedAt!: string | null;
}