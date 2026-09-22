import { Entity, Column } from "typeorm";

@Entity('user_groups')
export class UserGroup {
    @Column({ name: "student_id", type: 'varchar', length: 36, primary: true })
    studentId!: string;

    @Column({ name: "students_group_id", type: 'varchar', length: 36, primary: true })
    studentsGroupId!: string;
}