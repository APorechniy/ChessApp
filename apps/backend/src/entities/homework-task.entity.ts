import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('homework_tasks')
export class HomeworkTask {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ name: "order_index", type: "integer" })
    orderIndex!: number;

    @Column({ name: "homework_id", type: "varchar", length: 36 })
    homeworkId!: string;

    @Column({ name: "task_id", type: "varchar", length: 36 })
    taskId!: string;
}