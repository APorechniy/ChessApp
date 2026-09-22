import { Entity, Column } from "typeorm";

@Entity('students_groups')
export class StudentsGroup {
    @Column({ type: 'varchar', length: 36, primary: true })
    id!: string;

    @Column({ name: 'name', type: 'varchar', length: 50, unique: true, default: "Группа" })
    name!: string;

    @Column({ name: "description", type: 'varchar', length: 200, nullable: true })
    description?: string

    @Column({ name: "color", type: 'varchar', length: 6, nullable: true })
    color?: string | null

    @Column({ name: "is_deleted", type: 'boolean', nullable: true, default: false })
    isDeleted!: boolean
}