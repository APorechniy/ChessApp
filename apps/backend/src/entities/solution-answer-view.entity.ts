import { ViewEntity, ViewColumn } from "typeorm";
import { sqlToUtc, utcToSql } from "../utils/utc-to-sql";
import { localToUtc } from "@/utils/local-to-utc";
import { SolutionAnswerStatus } from "./solution-answer.entity";
import { HomeworkTasksView } from "./homework-tasks-view.entity";

@ViewEntity('solution_answer_view')
export class SolutionAnswerView {
    @ViewColumn()
    id!: string;

    @ViewColumn()
    homeworkId!: string;

    @ViewColumn()
    homeworkSolutionId!: string;

    @ViewColumn()
    homeworkTask!: HomeworkTasksView;

    @ViewColumn()
    answerText!: string | null;

    @ViewColumn({
        name: "startedAt",
        transformer: {
            to: (value: string | null): string | null =>
                value === null ? null : utcToSql(localToUtc(value)),
            from: (value: string | null): string | null =>
                value === null ? null : sqlToUtc(value),
        },
    })
    startedAt!: string | null;

    @ViewColumn({
        name: "submittedAt",
        transformer: {
            to: (value: string | null): string | null =>
                value === null ? null : utcToSql(localToUtc(value)),
            from: (value: string | null): string | null =>
                value === null ? null : sqlToUtc(value),
        },
    })
    submittedAt!: string | null;

    @ViewColumn({
        name: "checkedAt",
        transformer: {
            to: (value: string | null): string | null =>
                value === null ? null : utcToSql(localToUtc(value)),
            from: (value: string | null): string | null =>
                value === null ? null : sqlToUtc(value),
        },
    })
    checkedAt!: string | null;

    @ViewColumn({
        name: "status",
    })
    status!: SolutionAnswerStatus;

    @ViewColumn({ name: "coachComment" })
    coachComment!: string | null;
}