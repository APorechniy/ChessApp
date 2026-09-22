import { type Repository, type DataSource } from "typeorm";

import { v4 as uuidv4 } from "uuid";
import { AttendanceMainTask } from "../entities/attendance-main-task.entity";
import { AttendanceMainTaskView } from "../entities/attendance-main-task-view.entity";

// Репозиторий для управления связями между занятиями и задачами
export class AttendanceMainTasksRepository {
  private tableRepo: Repository<AttendanceMainTask>;
  private viewRepo: Repository<AttendanceMainTaskView>;

  constructor(dataSource: DataSource) {
    this.tableRepo = dataSource.getRepository(AttendanceMainTask);
    this.viewRepo = dataSource.getRepository(AttendanceMainTaskView);
  }

  async getTasksByAttendanceId(attendanceId: string) {
    const resultRow = await this.viewRepo.findOne({
      where: {
        attendanceId: attendanceId
      }
    })

    return resultRow?.mainTasks;
  }

  async createNewAttendanceMainTask(attendanceId: string, taskId: string) {
    const newAttendanceMainTasksId = uuidv4();

    const createdAttendancemainTask = this.tableRepo.create({
      id: newAttendanceMainTasksId,
      attendanceId: attendanceId,
      taskId: taskId,
    })

    return Boolean(await this.tableRepo.save(createdAttendancemainTask));
  }

  async removeTasksByAttendanceId(attendanceId: string) {
    const isDeleted = await this.tableRepo.delete({
      attendanceId: attendanceId
    })

    return Boolean(isDeleted);
  }
}
