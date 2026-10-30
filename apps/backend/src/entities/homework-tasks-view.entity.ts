import { ViewColumn, ViewEntity } from "typeorm";
import { TaskView } from "./task-view.entity";

@ViewEntity({
    name: 'homework_tasks_view'
})
export class HomeworkTasksView {
    @ViewColumn()
    id!: string;

    @ViewColumn()
    orderIndex!: number;

    @ViewColumn()
    homeworkId!: string;

    @ViewColumn({
        name: 'task',
        transformer: {
            from: (value: string | TaskView | null): TaskView | null => {
                if (value === null || value === undefined) return null;
                if (typeof value === 'string') {
                    return JSON.parse(value) as TaskView;
                }
                return value;
            },
            to: (value: TaskView | null): string | TaskView | null => value,
        },
    })
    task!: TaskView | null;
}