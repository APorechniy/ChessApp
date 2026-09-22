import { Entity, Column } from "typeorm";

@Entity('learning_topics')
export class LearningTopic {
    @Column({ type: 'varchar', length: 36, primary: true })
    id!: string;

    @Column({ name: 'name', type: 'varchar', length: 150 })
    name!: string;

    @Column({ name: "level_id", type: 'varchar', length: 36 })
    levelId!: string

    @Column({ name: "description", type: 'text', nullable: true })
    description?: string
}