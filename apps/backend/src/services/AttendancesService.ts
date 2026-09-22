import { type Attendance } from "../entities/attendance.entity";
import { type AttendanceView } from "../entities/attendance-view.entity";
import type {
  AttendancesRepository,
  AttendanceMainTasksRepository,
  AttendanceAdditionalTasksRepository,
  UserBalanceRepository,
  StudentsAttendedRepository,
  StudentsGroupsRepository,
  StudentsBalanceTransactionRepository,
  SettingsRepository,
  AttendancePresetRepository,
} from "../repositories";
import { type StudentsAttendedView } from "../entities/students-attended-view.entity";
import { v4 as uuidv4 } from 'uuid'
import { type StudentsBalanceTransaction } from "../entities/students-balance-transaction.entity";
import { utcToSql } from "../utils/utc-to-sql";
import { localToUtc } from "../utils/local-to-utc";
import { createPartialAttendance } from "@/utils/create-partial-attendance";
import { type PartialAttendance } from "@/types/Attendance";

export class AttendancesService {
  constructor(
    private attendancesRepository: AttendancesRepository,
    private attendanceMainTasksRepository: AttendanceMainTasksRepository,
    private attendanceAdditionalTasksRepository: AttendanceAdditionalTasksRepository,
    private attendancePresetRepository: AttendancePresetRepository,
    private settingsRepository: SettingsRepository,
    private studentsAttendedRepository: StudentsAttendedRepository,
    private studentsBalanceTransactionRepository: StudentsBalanceTransactionRepository,
    private studentsGroupsRepository: StudentsGroupsRepository,
    private userBalanceRepository: UserBalanceRepository,
  ) { }

  async getAttendancesList(date: string): Promise<Array<AttendanceView | PartialAttendance> | null> {
    try {
      // Добавить валидацию даты
      const attendancesList =
        await this.attendancesRepository.getAttendancesList(date);

      const presetsList =
        await this.attendancePresetRepository.getAttendancePresetsByDate(date);

      const partialAttendancesByPreset = presetsList
        .filter((p) => !(attendancesList.some(a => a?.presetId === p.id)))
        .map((p) => createPartialAttendance(p, date))

      return [...attendancesList, ...partialAttendancesByPreset];
    } catch (error) {
      throw error;
    }
  }

  async getUnclosedAttendances(date: string, coachId?: string): Promise<AttendanceView[] | null> {
    try {
      // Добавить валидацию даты

      const attendancesList =
        await this.attendancesRepository.getUnclosedAttendancesList(date, coachId);

      return attendancesList;
    } catch (error) {
      throw error;
    }
  }

  async getAttendancesListForStudent(date: string, studentId: string): Promise<AttendanceView[] | null> {
    try {
      // Добавить валидацию дат

      const attendancesList =
        await this.attendancesRepository.getAttendancesForStudent(date, studentId);

      return attendancesList;
    } catch (error) {
      throw error;
    }
  }

  async getNextAttendance(studentId: string): Promise<AttendanceView | null> {
    return this.attendancesRepository.getNextAttendanceByStudentId(studentId);
  }

  async createAttendance(
    attendance: Omit<AttendanceView, "id">,
  ): Promise<boolean> {
    const fullAttendance: AttendanceView = {
      id: uuidv4(),
      ...attendance,
    };

    if (fullAttendance.type === "TRIAL") {
      if (fullAttendance.student) {
        const studentHasTrialBefore = await this.attendancesRepository.hasTrialAttendanceBefore(fullAttendance.student.id)

        if (studentHasTrialBefore) {
          throw new Error("This student has trial attendance before");
        }
      } else {
        throw new Error("Trial attendance can create only for one student")
      }
    }

    const transformedAttendance: Attendance = {
      id: fullAttendance.id,
      learningTopicId: fullAttendance.learningTopic.id,
      studentId: fullAttendance?.student?.id,
      studentsGroupId: fullAttendance?.group?.id,
      coachId: fullAttendance.coach.id,
      homeworkDone: fullAttendance.homeworkDone,
      qualityId: fullAttendance?.quality?.id,
      isOnline: fullAttendance.isOnline,
      meetLink: fullAttendance.meetLink,
      isFreeze: fullAttendance.isFreeze,
      type: fullAttendance.type,
      isDeleted: fullAttendance.isDeleted,
      startDate: fullAttendance.startDate,
      endDate: fullAttendance.endDate,
      presetId: null,
    }

    const isCreatedAttendance =
      await this.attendancesRepository.createAttendance(transformedAttendance);
    let isCreatedTasks: boolean = true;
    let isCreatedAdditionalTasks: boolean = true;
    let isLinkedAttendance: boolean = true;

    if (fullAttendance.type === "REGULAR" || fullAttendance.type === "TRIAL") {
      if (fullAttendance.student?.id) {
        isLinkedAttendance = await this.studentsAttendedRepository.createNewLink(fullAttendance.student.id, fullAttendance.id)
      } else {
        isLinkedAttendance = false
      }
    } else {
      if (fullAttendance.group?.id) {
        const actualGroup = await this.studentsGroupsRepository.getStudentsGroupById(fullAttendance.group.id);

        const linkCreated = await Promise.all(actualGroup.students.map(async (s) => {
          return this.studentsAttendedRepository.createNewLink(s.id, fullAttendance.id)
        }))

        isLinkedAttendance = linkCreated.some((v) => v)
      } else {
        isLinkedAttendance = false
      }
    }

    // Если в занятии присутствуют задачи - создаем новые
    if (fullAttendance.tasks && fullAttendance.tasks.length > 0) {
      const tasksCreated = await Promise.all(
        fullAttendance.tasks.map(async (t) => {
          const created =
            await this.attendanceMainTasksRepository.createNewAttendanceMainTask(
              fullAttendance.id,
              t.id,
            );
          return created;
        }),
      );
      isCreatedTasks = tasksCreated.some((v) => v);
    }

    // Если в занятии присутствуют доп задачи - создаем новые
    if (fullAttendance.additionalTasks && fullAttendance.additionalTasks.length > 0) {
      const tasksCreated = await Promise.all(
        fullAttendance.additionalTasks.map(async (t) => {
          const created =
            await this.attendanceAdditionalTasksRepository.createNewAttendanceAdditionalTask(
              fullAttendance.id,
              t.id,
            );
          return created;
        }),
      );
      isCreatedAdditionalTasks = tasksCreated.some((v) => v);
    }

    if (isCreatedAdditionalTasks && isCreatedTasks && isCreatedAttendance && isLinkedAttendance) {
      return true;
    } else {
      this.attendanceAdditionalTasksRepository.removeTasksByAttendanceId(
        fullAttendance.id,
      );
      this.attendanceMainTasksRepository.removeTasksByAttendanceId(
        fullAttendance.id,
      );
      this.attendancesRepository.removeAttendance(fullAttendance.id);

      if (!isCreatedAdditionalTasks) {
        throw new Error("Can not create additional tasks");
      }

      if (!isCreatedTasks) {
        throw new Error("Can not create main tasks");
      }

      if (!isCreatedAttendance) {
        throw new Error("Can not create attendance");
      }
      if (!isLinkedAttendance) {
        throw new Error("Can not link students or group to attendance");
      }
    }

    return isCreatedAttendance;
  }

  async createAttendanceByPreset(
    attendance: Omit<AttendanceView, "id">,
  ): Promise<boolean> {
    const fullAttendance: AttendanceView = {
      id: uuidv4(),
      ...attendance,
    };

    const transformedAttendance: Attendance = {
      id: fullAttendance.id,
      learningTopicId: fullAttendance.learningTopic.id,
      studentId: fullAttendance?.student?.id,
      studentsGroupId: fullAttendance?.group?.id,
      coachId: fullAttendance.coach.id,
      homeworkDone: fullAttendance.homeworkDone,
      qualityId: fullAttendance?.quality?.id,
      isOnline: fullAttendance.isOnline,
      meetLink: fullAttendance.meetLink,
      isFreeze: fullAttendance.isFreeze,
      type: fullAttendance.type,
      presetId: fullAttendance.presetId,
      isDeleted: fullAttendance.isDeleted,
      startDate: fullAttendance.startDate,
      endDate: fullAttendance.endDate,
    }

    const isCreatedAttendance =
      await this.attendancesRepository.createAttendance(transformedAttendance);
    let isCreatedTasks: boolean = true;
    let isCreatedAdditionalTasks: boolean = true;
    let isLinkedAttendance: boolean = true;

    if (fullAttendance.type === "REGULAR") {
      if (fullAttendance.student?.id) {
        isLinkedAttendance = await this.studentsAttendedRepository.createNewLink(fullAttendance.student.id, fullAttendance.id)
      } else {
        isLinkedAttendance = false
      }
    } else {
      if (fullAttendance.group?.id) {
        const actualGroup = await this.studentsGroupsRepository.getStudentsGroupById(fullAttendance.group.id);

        const linkCreated = await Promise.all(actualGroup.students.map(async (s) => {
          return this.studentsAttendedRepository.createNewLink(s.id, fullAttendance.id)
        }))

        isLinkedAttendance = linkCreated.some((v) => v)
      } else {
        isLinkedAttendance = false
      }
    }

    // Если в занятии присутствуют задачи - создаем новые
    if (fullAttendance.tasks && fullAttendance.tasks.length > 0) {
      const tasksCreated = await Promise.all(
        fullAttendance.tasks.map(async (t) => {
          const created =
            await this.attendanceMainTasksRepository.createNewAttendanceMainTask(
              fullAttendance.id,
              t.id,
            );
          return created;
        }),
      );
      isCreatedTasks = tasksCreated.some((v) => v);
    }

    // Если в занятии присутствуют доп задачи - создаем новые
    if (fullAttendance.additionalTasks && fullAttendance.additionalTasks.length > 0) {
      const tasksCreated = await Promise.all(
        fullAttendance.additionalTasks.map(async (t) => {
          const created =
            await this.attendanceAdditionalTasksRepository.createNewAttendanceAdditionalTask(
              fullAttendance.id,
              t.id,
            );
          return created;
        }),
      );
      isCreatedAdditionalTasks = tasksCreated.some((v) => v);
    }

    if (isCreatedAdditionalTasks && isCreatedTasks && isCreatedAttendance && isLinkedAttendance) {
      return true;
    } else {
      this.attendanceAdditionalTasksRepository.removeTasksByAttendanceId(
        fullAttendance.id,
      );
      this.attendanceMainTasksRepository.removeTasksByAttendanceId(
        fullAttendance.id,
      );
      this.attendancesRepository.removeAttendance(fullAttendance.id);

      if (!isCreatedAdditionalTasks) {
        throw new Error("Can not create additional tasks");
      }

      if (!isCreatedTasks) {
        throw new Error("Can not create main tasks");
      }

      if (!isCreatedAttendance) {
        throw new Error("Can not create attendance");
      }
      if (!isLinkedAttendance) {
        throw new Error("Can not link students or group to attendance");
      }
    }

    return isCreatedAttendance;
  }

  async freezeAttendance(
    attendance: AttendanceView,
    studentsAttended: StudentsAttendedView[],
  ): Promise<boolean> {
    await this.updateAttendance(attendance, studentsAttended);
    await this.attendancesRepository.freezeAttendance(attendance.id);
    const settings = await this.settingsRepository.getSettings()

    // Перевести на .env
    if (attendance.type !== "TRIAL" && settings.ukassaIsConnected) {
      if (attendance.type === "REGULAR") {
        if (attendance.student) {
          const currentStudentId = attendance.student.id
          const isAttended = studentsAttended.findIndex(sa => sa.student.id === currentStudentId) >= 0

          if (isAttended) {
            const transaction: StudentsBalanceTransaction = {
              id: uuidv4(),
              studentId: currentStudentId,
              attendanceId: attendance.id,
              type: "WRITE-OFF",
              sum: -750,
              createdAt: utcToSql(localToUtc(new Date().toISOString()))
            }
            await this.userBalanceRepository.decrementUserBalance(
              attendance.student.id,
              750,
            );
            await this.studentsBalanceTransactionRepository.createStudentBalanceTransaction(transaction)
          }
        } else {
          throw new Error("REGULAR attendance must have a student")
        }
      }

      if (attendance.type === "GROUP") {
        if (attendance.group) {
          attendance.group.students.forEach(async (s) => {
            const isAttended = studentsAttended.findIndex(sa => sa.student.id === s.id && sa.attended) >= 0
            if (isAttended) {
              const transaction: StudentsBalanceTransaction = {
                id: uuidv4(),
                studentId: s.id,
                attendanceId: attendance.id,
                type: "WRITE-OFF",
                sum: -750,
                createdAt: utcToSql(localToUtc(new Date().toISOString()))
              }
              await this.userBalanceRepository.decrementUserBalance(
                s.id,
                750,
              );
              await this.studentsBalanceTransactionRepository.createStudentBalanceTransaction(transaction)
            }
          })
        } else {
          throw new Error("GROUP attendance must have a group of students")
        }
      }
    }

    return true;
  }

  async updateAttendance(
    attendance: AttendanceView,
    studentsAttended: StudentsAttendedView[],
  ): Promise<boolean> {
    const transformedAttendance: Attendance = {
      id: attendance.id,
      learningTopicId: attendance.learningTopic.id,
      studentId: attendance?.student?.id || null,
      studentsGroupId: attendance?.group?.id || null,
      coachId: attendance.coach.id,
      homeworkDone: attendance.homeworkDone,
      qualityId: attendance?.quality?.id,
      isOnline: attendance.isOnline,
      meetLink: attendance.meetLink,
      isFreeze: attendance.isFreeze,
      type: attendance.type,
      isDeleted: attendance.isDeleted,
      startDate: attendance.startDate,
      endDate: attendance.endDate,
      presetId: attendance?.presetId,
    }

    const isUpdatedAttendance =
      await this.attendancesRepository.updateAttendance(transformedAttendance);

    // Актуализируем статусы посещений
    await Promise.all(studentsAttended.map(async (sa) => {
      if (sa.attended) {
        return this.studentsAttendedRepository.markAsAttended(sa.student.id, attendance.id)
      } else {
        return this.studentsAttendedRepository.markAsNotAttended(sa.student.id, attendance.id)
      }
    }))

    if (isUpdatedAttendance && attendance.type !== "GROUP") {
      if (studentsAttended[0]?.student?.id && attendance.student?.id && attendance.student?.id !== studentsAttended[0].student.id) {
        await this.studentsAttendedRepository.removeAllStudentsFromAttendance(attendance.id)
        await this.studentsAttendedRepository.createNewLink(attendance.student?.id, attendance.id)
      }
    }

    // Если в занятии присутствуют задачи - создаем новые
    if (attendance.tasks) {
      const isDeleted =
        await this.attendanceMainTasksRepository.removeTasksByAttendanceId(
          attendance.id,
        );

      if (isDeleted) {
        await Promise.all(attendance.tasks.map(async (t) =>
          await this.attendanceMainTasksRepository.createNewAttendanceMainTask(
            attendance.id,
            t.id,
          ),
        ));
      }
    }

    // Если в занятии присутствуют доп - создаем новые
    if (attendance.additionalTasks) {
      const isDeleted =
        await this.attendanceAdditionalTasksRepository.removeTasksByAttendanceId(
          attendance.id,
        );

      if (isDeleted) {
        await Promise.all(attendance.additionalTasks.map(async (t) =>
          await this.attendanceAdditionalTasksRepository.createNewAttendanceAdditionalTask(
            attendance.id,
            t.id,
          ),
        ));
      }
    }

    if (!isUpdatedAttendance) {
      throw new Error("Can not update attendance");
    }

    return isUpdatedAttendance;
  }

  async removeAttendance(
    attendanceId: string,
  ): Promise<boolean> {
    const isRemovedAttendance = await this.attendancesRepository.removeAttendance(attendanceId);

    return isRemovedAttendance;
  }
}
