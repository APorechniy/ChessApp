import { ViewEntity, ViewColumn } from "typeorm";
import { type StudentView } from "./student-view.entity";
import { type StudentsGroupView } from "./students-group-view.entity";
import { sqlToUtc, utcToSql } from "@/utils/utc-to-sql";

@ViewEntity({
    name: "attendance_preset_view"
})
export class AttendancePresetView {
    @ViewColumn()
    id!: string;

    @ViewColumn()
    student: {
        id: StudentView["id"],
        firstName: StudentView["firstName"],
        lastName: StudentView["lastName"],
    } | null;

    @ViewColumn()
    group!: StudentsGroupView | null;

    @ViewColumn()
    type!: 'REGULAR' | 'GROUP';

    @ViewColumn()
    rrule!: string;

    @ViewColumn({
        transformer: {
            to: (value: string) => value,
            from: (value: string) => `${value.split(":")[0]}:${value.split(":")[1]}`
        }
    })
    startTimeLocal!: string;

    @ViewColumn({
        transformer: {
            to: (value: string) => value,
            from: (value: string) => `${value.split(":")[0]}:${value.split(":")[1]}`
        }
    })
    endTimeLocal!: string;

    @ViewColumn({
        transformer: {
            to: (value: string): string => utcToSql(value),
            from: (value: string): string => sqlToUtc(value)
        }
    })
    endDate!: string;

    @ViewColumn({
        transformer: {
            // Преобразование при сохранении в БД
            to: (value: string[]): string => {
                return JSON.stringify(value || []);
            },
            // Преобразование при чтении из БД
            from: (value: string): string[] => {
                if (typeof value === 'string') {
                    return JSON.parse(value);
                }
                return value || [];
            }
        }
    })
    excludedDates!: Array<string>

    @ViewColumn()
    timezone!: string;
}