import { Entity, Column } from "typeorm";

@Entity('students_balance_transaction')
export class StudentsBalanceTransaction {
    @Column({ type: 'varchar', length: 36, primary: true })
    id!: string;

    @Column({ name: 'student_id', type: 'varchar', length: 36 })
    studentId!: string;

    @Column({ name: "attendance_id", type: 'varchar', length: 36, nullable: true, default: null })
    attendanceId?: string

    @Column({ name: "payment_id", type: 'varchar', length: 36, nullable: true, default: null })
    paymentId?: string

    @Column({ name: "type", type: "enum", enum: ['REPLENISHMENT', 'WRITE-OFF'] })
    type!: 'REPLENISHMENT' | 'WRITE-OFF'

    @Column({ name: "sum", type: 'int' })
    sum!: number

    @Column({ name: "created_at", type: 'timestamp' })
    createdAt!: string
}