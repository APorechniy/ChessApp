import { ViewColumn, ViewEntity } from "typeorm";
import { sqlToUtc, utcToSql } from "../utils/utc-to-sql";
import { localToUtc } from "@/utils/local-to-utc";
import { type TaskView } from "./task-view.entity";

@ViewEntity({
    name: 'homework_view'
})
export class HomeworkView {
    @ViewColumn()
    id!: string;

    @ViewColumn()
    name!: string;

    @ViewColumn({
        transformer: {
            to: (value: string): string | null => utcToSql(localToUtc(value)),
            from: (value: string): string | null => sqlToUtc(value)
        }
    })
    expiresAt!: string;

    @ViewColumn()
    attendanceId!: string;

    @ViewColumn({
        name: 'tasks',
        transformer: {
            from: (value: string | TaskView[] | null): TaskView[] => {
                if (value === null || value === undefined) return [];
                if (typeof value === 'string') {
                    return JSON.parse(value) as TaskView[];
                }
                // некоторые драйверы (pg) возвращают уже распарсенный json
                return value;
            },
            to: (value: TaskView[]): string | TaskView[] => value,
        },
    })
    tasks!: TaskView[]
}