import { Entity, Column } from "typeorm";

@Entity('attendance_additional_tasks')
export class AttendanceAdditionalTask {
    @Column({ name: "id", type: 'varchar', length: 36, primary: true })
    id!: string;

    @Column({ name: 'attendance_id', type: 'varchar', length: 36 })
    attendanceId!: string;

    @Column({ name: 'task_id', type: 'varchar', length: 36 })
    taskId!: string
}