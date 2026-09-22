import { ViewEntity, ViewColumn } from "typeorm";
import { type TaskView } from "./task-view.entity";

@ViewEntity({
    name: "attendance_main_tasks_view",
})
export class AttendanceMainTaskView {
    @ViewColumn()
    attendanceId!: string;

    @ViewColumn()
    mainTasks!: Array<{
        id: TaskView["id"];
        name: TaskView["name"];
        learningTopic: TaskView["learningTopic"];
        quality: TaskView["quality"];
    }>;
}