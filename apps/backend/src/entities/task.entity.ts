import { Entity, Column } from "typeorm";

@Entity('tasks')
export class Task {
    @Column({ type: 'varchar', length: 36, primary: true })
    id!: string;

    @Column({ name: 'name', type: 'varchar', length: 100, unique: true })
    name!: string;

    @Column({ name: "learning_topic_id", type: 'varchar', length: 36 })
    learningTopicId!: string

    @Column({ name: "quality_id", type: 'varchar', length: 36 })
    qualityId!: string

    @Column({ name: "position", type: 'varchar', length: 87, nullable: true })
    position!: string | null

    @Column({ name: "is_removed", type: 'boolean', nullable: true, default: false })
    isRemoved!: boolean
}