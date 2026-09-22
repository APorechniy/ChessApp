import { Entity, Column } from "typeorm";

@Entity('attendance_main_tasks')
export class AttendanceMainTask {
    @Column({ name: "id", type: 'varchar', length: 36, primary: true })
    id!: string;

    @Column({ name: 'attendance_id', type: 'varchar', length: 36 })
    attendanceId!: string;

    @Column({ name: 'task_id', type: 'varchar', length: 36 })
    taskId!: string
}