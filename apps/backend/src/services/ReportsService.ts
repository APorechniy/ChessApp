import type { AttendancesRepository, StudentsAttendedRepository, StudentsRepository } from "../repositories";

import { Workbook } from "exceljs";
import { buildWorkBook } from "../utils/build-worbook";
import { transliteration } from "../utils/transliteration";
import { agregateString } from "../utils/agregate-strings";
import { getHumanityAttendanceType } from "../utils/get-humanity-attendance-type";

export class ReportsService {
  constructor(
    // private reportsRepository: ReportsRepository,
    private attendancesRepository: AttendancesRepository,
    private studentsAttendedRepository: StudentsAttendedRepository,
    private studentsRepository: StudentsRepository,
  ) { }

  // async getReportsByStudentId(studentId: string): Promise<Report[] | null> {
  //   try {
  //     const reportsList =
  //       await this.reportsRepository.getReportsByStudentsId(studentId);

  //     return reportsList;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // Добавить хранение в S3
  async createReport(studentId: string): Promise<Workbook> {
    try {
      const studentAttendancesList =
        await this.attendancesRepository.getAllAttendancesListByStudentId(
          studentId,
        );

      const student = await this.studentsRepository.getStudentById(studentId);

      if (studentAttendancesList.length === 0 || !student) {
        throw new Error("Can not find attendances for student");
      }

      const tableName = transliteration(
        `${student.lastName}_${student.firstName}`,
      );

      const rows = await Promise.all(studentAttendancesList.map(async (a) => {
        return {
          data: {
            attendance_date: a.startDate,
            coach_name: `${a.coach.lastName} ${a.coach.firstName}`,
            learning_topic: a.learningTopic.name,
            quality: a.quality,
            type: getHumanityAttendanceType(a.type),
            attendance_main_tasks: agregateString(a?.tasks || [], "name"),
            attendance_additional_tasks: agregateString(a?.additionalTasks || [], "name"),
            chess_games: "-",
            chess_opening: "-",
            homework_done: a.homeworkDone ? "ДА" : "НЕТ",
            attended: await this.studentsAttendedRepository.getIsAttended(studentId, a.id) ? "ДА" : "НЕТ",
            is_paid: "ДА",
          },
        };
      }));

      const workbook = await buildWorkBook(rows, tableName);

      return workbook;
    } catch (error) {
      throw error;
    }
  }
}
