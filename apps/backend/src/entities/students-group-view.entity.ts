import { ViewEntity, ViewColumn } from "typeorm";
import { type StudentView } from "./student-view.entity";

@ViewEntity('students_group_view')
export class StudentsGroupView {
    @ViewColumn()
    id!: string;

    @ViewColumn()
    name!: string;

    @ViewColumn()
    description?: string

    @ViewColumn()
    color?: string | null

    @ViewColumn()
    students!: {
        id: StudentView["id"],
        firstName: StudentView["firstName"],
        lastName: StudentView["lastName"],
    }[]
}