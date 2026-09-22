import { Entity, Column } from "typeorm";

@Entity('attendance_preset')
export class AttendancePreset {
    @Column({ type: 'varchar', length: 36, primary: true })
    id!: string;

    @Column({ name: 'student_id', type: 'varchar', length: 36, nullable: true, default: null })
    studentId?: string | null;

    @Column({ name: 'students_group_id', type: 'varchar', length: 36, nullable: true, default: null })
    studentsGroupId?: string | null;

    @Column({ name: "type", type: "enum", enum: ['REGULAR', 'GROUP'] })
    type!: 'REGULAR' | 'GROUP';

    @Column({ name: "rrule", type: 'varchar', length: 500, nullable: false })
    rrule!: string;

    @Column({ name: "start_time_local", type: 'time' })
    startTimeLocal!: string

    @Column({ name: "end_time_local", type: 'time' })
    endTimeLocal!: string

    @Column({ name: "end_date", type: "timestamp" })
    endDate!: string

    @Column({ name: "excluded_dates", type: "json", default: () => '(JSON_ARRAY())' })
    excludedDates!: Array<string>

    @Column({ name: "timezone", type: 'varchar', length: 50, nullable: false })
    timezone!: string;
}