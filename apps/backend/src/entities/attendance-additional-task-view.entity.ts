import { ViewEntity, ViewColumn } from "typeorm";
import { TaskView } from "./task-view.entity";

@ViewEntity({
    name: "attendance_additional_tasks_view",
})
export class AttendanceAdditionalTaskView {
    @ViewColumn()
    attendanceId!: string;

    @ViewColumn()
    additionalTasks!: Array<{
        id: TaskView["id"];
        name: TaskView["name"];
        learningTopic: TaskView["learningTopic"];
        quality: TaskView["quality"];
    }>;
}