import { Workbook } from "exceljs";
import { AttendancesRepository } from "../repositories/AttendancesRepository";
import { CoachesRepository } from "../repositories/CoachesRepository";
import { buildWorkBook } from "../utils/build-worbook";
import { transliteration } from "../utils/transliteration";
import { agregateString } from "../utils/agregate-strings";
import { getHumanityAttendanceType } from "../utils/get-humanity-attendance-type";

export class CoachReportService {
  constructor(
    private attendancesRepository: AttendancesRepository,
    private coachesRepository: CoachesRepository,
  ) { }

  async createReport(coachId: string): Promise<Workbook> {
    try {
      const coachAttendancesList =
        await this.attendancesRepository.getAllAttendancesListByCoachId(
          coachId,
        );

      const coach = await this.coachesRepository.getCoachById(coachId);

      if (coachAttendancesList.length === 0 || !coach) {
        throw new Error("Can not find attendances for coach");
      }

      const tableName = transliteration(
        `${coach.lastName}_${coach.firstName}`,
      );

      const rows = await Promise.all(coachAttendancesList.map(async (a) => {
        return {
          data: {
            attendance_date: a.startDate,
            coach_name: `${a.coach.lastName} ${a.coach.firstName}`,
            learning_topic: a.learningTopic.name,
            type: getHumanityAttendanceType(a.type),
            attendance_main_tasks: agregateString(a?.tasks || [], "name"),
            attendance_additional_tasks: agregateString(a?.additionalTasks || [], "name"),
            chess_games: "-",
            chess_opening: "-",
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
