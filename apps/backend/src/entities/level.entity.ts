import { Entity, Column } from "typeorm";

@Entity('levels')
export class Level {
    @Column({ type: 'varchar', length: 36, primary: true })
    id!: string;

    @Column({ name: 'name', type: 'varchar', length: 100 })
    name!: string;

    @Column({ name: "hours_required", type: 'int' })
    hoursRequired!: number

    @Column({ name: "description", type: 'text', nullable: true })
    description?: string
}