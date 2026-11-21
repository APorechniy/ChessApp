import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { sqlToUtc, utcToSql } from "../utils/utc-to-sql";
import { localToUtc } from "@/utils/local-to-utc";

@Entity('homeworks')
export class Homework {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ name: "attendance_id", type: "varchar", length: 36, default: null })
    attendanceId?: string;

    @Column({ name: "name", type: "text" })
    name!: string;

    @Column({
        name: "expires_at",
        type: "timestamp",
        nullable: false,
        transformer: {
            to: (value: string): string | null => utcToSql(localToUtc(value)),
            from: (value: string): string | null => sqlToUtc(value)
        }
    })
    expiresAt!: string;
}