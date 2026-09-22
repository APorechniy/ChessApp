import { type Repository, type DataSource } from "typeorm";

import { v4 as uuidv4 } from "uuid";
import { AttendanceAdditionalTask } from "../entities/attendance-additional-task.entity";
import { AttendanceAdditionalTaskView } from "../entities/attendance-additional-task-view.entity";

// Репозиторий для управления связями между занятиями и дополнительными задачами
export class AttendanceAdditionalTasksRepository {
  private tableRepo: Repository<AttendanceAdditionalTask>;
  private viewRepo: Repository<AttendanceAdditionalTaskView>;

  constructor(dataSource: DataSource) {
    this.tableRepo = dataSource.getRepository(AttendanceAdditionalTask);
    this.viewRepo = dataSource.getRepository(AttendanceAdditionalTaskView);
  }

  async getTasksByAttendanceId(attendanceId: string) {
    const resultRow = await this.viewRepo.findOne({
      where: {
        attendanceId: attendanceId
      }
    })

    return resultRow?.additionalTasks;
  }

  async createNewAttendanceAdditionalTask(
    attendanceId: string,
    taskId: string,
  ) {
    const newAttendanceAdditionalTasksId = uuidv4();

    const createdAttendanceAdditionalTask = this.tableRepo.create({
      id: newAttendanceAdditionalTasksId,
      attendanceId: attendanceId,
      taskId: taskId,
    })

    return Boolean(await this.tableRepo.save(createdAttendanceAdditionalTask));
  }

  async removeTasksByAttendanceId(attendanceId: string) {
    const isDeleted = await this.tableRepo.delete({
      attendanceId: attendanceId
    })

    return Boolean(isDeleted);
  }
}
