import { ViewColumn, ViewEntity } from "typeorm";
import { sqlToUtc, utcToSql } from "../utils/utc-to-sql";
import { localToUtc } from "@/utils/local-to-utc";
import { HomeworkSolutionStatus } from "./homework-solution.entity";
import { type HomeworkView } from "./homework-view.entity";
import { type StudentView } from "./student-view.entity";

@ViewEntity({
    name: 'homework_solution_view'
})
export class HomeworkSolutionView {
    @ViewColumn()
    id!: string;

    @ViewColumn({
        name: 'student',
        transformer: {
            from: (value: string | StudentView | null): StudentView | null => {
                if (value === null || value === undefined) return null;
                if (typeof value === 'string') {
                    return JSON.parse(value) as StudentView;
                }
                return value;
            },
            to: (value: StudentView | null): string | StudentView | null => value,
        },
    })
    student!: StudentView | null;

    @ViewColumn({
        name: 'homework',
        transformer: {
            from: (value: string | HomeworkView | null): HomeworkView | null => {
                if (value === null || value === undefined) return null;
                if (typeof value === 'string') {
                    return JSON.parse(value) as HomeworkView;
                }
                return value;
            },
            to: (value: HomeworkView | null): string | HomeworkView | null => value,
        },
    })
    homework!: HomeworkView | null;

    @ViewColumn()
    status!: HomeworkSolutionStatus;

    @ViewColumn({
        transformer: {
            to: (value: string | null): string | null =>
                value === null ? null : utcToSql(localToUtc(value)),
            from: (value: string | null): string | null =>
                value === null ? null : sqlToUtc(value),
        },
    })
    startedAt!: string | null;

    @ViewColumn({
        transformer: {
            to: (value: string | null): string | null =>
                value === null ? null : utcToSql(localToUtc(value)),
            from: (value: string | null): string | null =>
                value === null ? null : sqlToUtc(value),
        },
    })
    finishedAt!: string | null;
}