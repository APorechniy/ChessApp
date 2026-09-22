import { ViewEntity, ViewColumn } from "typeorm";
import { type StudentView } from "./student-view.entity";

@ViewEntity('students_attended_view')
export class StudentsAttendedView {
    @ViewColumn()
    attendanceId!: string;

    @ViewColumn()
    student!: {
        id: StudentView["id"],
        firstName: StudentView["firstName"],
        lastName: StudentView["lastName"],
    };

    @ViewColumn({
        transformer: {
            to: (value: boolean): boolean => value,
            from: (value: number): boolean => Boolean(value)
        }
    })
    attended!: boolean
}