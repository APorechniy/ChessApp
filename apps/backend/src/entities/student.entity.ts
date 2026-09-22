import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('students')
export class Student {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ name: "first_name", type: "varchar", length: 100 })
    firstName!: string;

    @Column({ name: "last_name", type: "varchar", length: 100 })
    lastName!: string;

    @Column({ name: "birth_date", type: "varchar", length: 50, nullable: true })
    birthDate?: string | null;

    @Column({ name: "level_id", type: "varchar", length: 36 })
    levelId!: string;

    @Column({ name: "phone", type: "varchar", length: 20, nullable: true })
    phone?: string | null;

    @Column({ name: "email", type: "varchar", length: 100, nullable: true })
    email?: string | null;

    @Column({ name: "join_date", type: "date", nullable: true })
    joinDate?: string | null;

    @Column({ name: "notes", type: "text", nullable: true })
    notes?: string | null;

    @Column({ name: "paid_lessons", type: "int", nullable: true })
    paidLessons?: number | null;

    @Column({ name: "fshr_id", type: "int", nullable: true })
    fshrId?: number | null;

    @Column({ name: "fide_id", type: "int", nullable: true })
    fideId?: number | null;

    @Column({ name: "is_excluded", type: "boolean", nullable: true })
    isExcluded!: boolean;
}