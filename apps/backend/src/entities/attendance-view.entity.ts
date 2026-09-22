import { ViewEntity, ViewColumn } from "typeorm";
import { type LearningTopicView } from "./learning-topic-view.entity";
import { type StudentView } from "./student-view.entity";
import { type StudentsGroupView } from "./students-group-view.entity";
import { type CoachView } from "./coach-view.entity";
import { type QualityView } from "./quality-view.entity";
import { TaskView } from "./task-view.entity";
import { sqlToUtc, utcToSql } from "../utils/utc-to-sql";

@ViewEntity({
    name: "attendance_base_view"
})
export class AttendanceView {
    @ViewColumn()
    id!: string;

    @ViewColumn()
    learningTopic!: LearningTopicView;

    @ViewColumn()
    student!: {
        id: StudentView["id"],
        firstName: StudentView["firstName"],
        lastName: StudentView["lastName"],
    } | null;

    @ViewColumn()
    group!: StudentsGroupView | null;

    @ViewColumn()
    coach!: {
        id: CoachView["id"],
        firstName: CoachView["firstName"],
        lastName: CoachView["lastName"],
    };

    @ViewColumn({
        transformer: {
            to: (value: boolean): boolean => value,
            from: (value: number): boolean => Boolean(value)
        }
    })
    homeworkDone?: boolean;

    @ViewColumn()
    quality?: Omit<QualityView, "labelFor">;

    @ViewColumn()
    presetId!: string | null;

    @ViewColumn({
        transformer: {
            to: (value: boolean): boolean => value,
            from: (value: number): boolean => Boolean(value)
        }
    })
    isOnline?: boolean;

    @ViewColumn()
    meetLink!: string | null;

    @ViewColumn({
        transformer: {
            to: (value: boolean): boolean => value,
            from: (value: number): boolean => Boolean(value)
        }
    })
    isFreeze?: boolean;

    @ViewColumn()
    type!: 'REGULAR' | 'TRIAL' | 'GROUP';

    @ViewColumn({
        transformer: {
            to: (value: boolean): boolean => value,
            from: (value: number): boolean => Boolean(value)
        }
    })
    isDeleted?: boolean;

    @ViewColumn({
        transformer: {
            to: (value: string): string => utcToSql(value),
            from: (value: string): string => sqlToUtc(value)
        }
    })
    startDate!: string

    @ViewColumn({
        transformer: {
            to: (value: string): string => utcToSql(value),
            from: (value: string): string => sqlToUtc(value)
        }
    })
    endDate!: string

    @ViewColumn()
    tasks!: TaskView[] | null;

    @ViewColumn()
    additionalTasks?: TaskView[] | null;
}