import { Entity, Column } from "typeorm";

@Entity('students_attended')
export class StudentsAttended {
    @Column({ name: "student_id", type: 'varchar', length: 36, primary: true })
    studentId!: string;

    @Column({ name: 'attendance_id', type: 'varchar', length: 36, primary: true })
    attendanceId!: string;

    @Column({ name: "attended", type: 'boolean', default: false })
    attended!: boolean
}