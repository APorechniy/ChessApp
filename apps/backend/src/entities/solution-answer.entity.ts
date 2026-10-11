import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { sqlToUtc, utcToSql } from "../utils/utc-to-sql";
import { localToUtc } from "@/utils/local-to-utc";

export enum SolutionAnswerStatus {
    NotSolved = 'not_solved',
    Check = 'check',
    Error = 'error',
    Almost = 'almost',
    Success = 'success',
}

@Entity('solution_answers')
export class SolutionAnswer {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ name: "homework_id", type: "varchar", length: 36 })
    homeworkId!: string;

    @Column({ name: "homework_solution_id", type: "varchar", length: 36 })
    homeworkSolutionId!: string;

    @Column({ name: "homework_task_id", type: "varchar", length: 36 })
    homeworkTaskId!: string;

    @Column({ name: "answer_text", type: "text", nullable: true })
    answerText!: string | null;

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
        name: "submitted_at",
        type: "timestamp",
        nullable: true,
        transformer: {
            to: (value: string | null): string | null =>
                value === null ? null : utcToSql(localToUtc(value)),
            from: (value: string | null): string | null =>
                value === null ? null : sqlToUtc(value),
        },
    })
    submittedAt!: string | null;

    @Column({
        name: "checked_at",
        type: "timestamp",
        nullable: true,
        transformer: {
            to: (value: string | null): string | null =>
                value === null ? null : utcToSql(localToUtc(value)),
            from: (value: string | null): string | null =>
                value === null ? null : sqlToUtc(value),
        },
    })
    checkedAt!: string | null;

    @Column({
        name: "status",
        type: "enum",
        enum: SolutionAnswerStatus,
        default: SolutionAnswerStatus.NotSolved,
    })
    status!: SolutionAnswerStatus;

    @Column({ name: "coach_comment", type: "text", nullable: true })
    coachComment!: string | null;
}