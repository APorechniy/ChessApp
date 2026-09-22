import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity('student_statistic')
export class StudentStatistic {
    @ViewColumn()
    studentId!: string;

    @ViewColumn()
    lessons!: {
        total: number;
        visited: number;
    };

    @ViewColumn()
    topics!: {
        total: number;
        learned: number;
    };

    @ViewColumn()
    tasksSolvedCount!: number;

    @ViewColumn()
    activeDaysLastMonth!: number[];
}