import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { sqlToUtc, utcToSql } from "../utils/utc-to-sql";

@Entity('coaches')
export class Coach {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ name: "first_name", type: "varchar", length: 100 })
    firstName!: string;

    @Column({ name: "last_name", type: "varchar", length: 100 })
    lastName!: string;

    @Column({
        name: "birth_date",
        type: "varchar",
        length: 50,
        nullable: true,
        transformer: {
            to: (value: string): string | null => utcToSql(value),
            from: (value: string): string | null => sqlToUtc(value)
        }
    })
    birthDate!: string;

    @Column({ name: "avatar", type: "varchar", length: 200, nullable: true })
    avatar?: string | null;

    @Column({ name: "phone", type: "varchar", length: 20, nullable: true })
    phone?: string | null;

    @Column({ name: "email", type: "varchar", length: 100, nullable: true })
    email?: string | null;

    @Column({ name: "biography", type: "text", nullable: true })
    biography?: string | null;

    @Column({ name: "fshr_id", type: "int", nullable: true })
    fshrId?: number | null;

    @Column({ name: "fide_id", type: "int", nullable: true })
    fideId?: number | null;

    @Column({
        name: "join_date",
        type: "date",
        nullable: true,
        transformer: {
            to: (value: string): string | null => utcToSql(value),
            from: (value: string): string | null => sqlToUtc(value)
        }
    })
    joinDate!: string;

    @Column({ name: "is_fired", type: "boolean", nullable: true })
    isFired?: boolean | null;
}