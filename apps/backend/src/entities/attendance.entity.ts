import { Entity, Column } from "typeorm";

@Entity('attendance')
export class Attendance {
    @Column({ type: 'varchar', length: 36, primary: true })
    id!: string;

    @Column({ name: 'learning_topic_id', type: 'varchar', length: 36 })
    learningTopicId!: string;

    @Column({ name: 'student_id', type: 'varchar', length: 36, nullable: true, default: null })
    studentId?: string | null;

    @Column({ name: 'students_group_id', type: 'varchar', length: 36, nullable: true, default: null })
    studentsGroupId?: string | null;

    @Column({ name: 'coach_id', type: 'varchar', length: 36 })
    coachId!: string;

    @Column({ name: "homework_done", type: "boolean", default: false })
    homeworkDone?: boolean;

    @Column({ name: 'quality_id', type: 'varchar', length: 36 })
    qualityId?: string;

    @Column({ name: 'preset_id', type: 'varchar', length: 36, nullable: true })
    presetId!: string | null;

    @Column({ name: "is_online", type: "boolean", nullable: true, default: false })
    isOnline?: boolean;

    @Column({ name: "meet_link", type: "varchar", length: 200, nullable: true, default: null })
    meetLink!: string | null;

    @Column({ name: "is_freeze", type: "boolean", default: false })
    isFreeze?: boolean;

    @Column({ name: "type", type: "enum", enum: ['REGULAR', 'TRIAL', 'GROUP'] })
    type!: 'REGULAR' | 'TRIAL' | 'GROUP';

    @Column({ name: "is_deleted", type: "boolean", default: false })
    isDeleted?: boolean;

    @Column({ name: "start_date", type: 'timestamp' })
    startDate!: string

    @Column({ name: "end_date", type: 'timestamp' })
    endDate!: string
}