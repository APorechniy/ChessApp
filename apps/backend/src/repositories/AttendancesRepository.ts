import { type Repository, type DataSource, Raw, Brackets } from "typeorm";
import { utcToSql } from "../utils/utc-to-sql";
import { localToUtc } from "../utils/local-to-utc";
import { Attendance } from "../entities/attendance.entity";
import { AttendanceView } from "../entities/attendance-view.entity";

export class AttendancesRepository {
  private tableRepo: Repository<Attendance>;
  private viewRepo: Repository<AttendanceView>;

  constructor(dataSource: DataSource) {
    this.tableRepo = dataSource.getRepository(Attendance);
    this.viewRepo = dataSource.getRepository(AttendanceView);
  }

  // Дата в формате YYYY-MM-DD
  async getAttendancesList(attendanceDate: string) {
    const year = attendanceDate.slice(0, 4);
    const month = attendanceDate.slice(5, 7);
    const day = attendanceDate.slice(8, 10);

    const attendanceList = await this.viewRepo.createQueryBuilder("abv")
      .where("EXTRACT(DAY FROM abv.startDate) = :day", { day })
      .andWhere("EXTRACT(MONTH FROM abv.startDate) = :month", { month })
      .andWhere("EXTRACT(YEAR FROM abv.startDate) = :year", { year })
      .getMany();

    return attendanceList;
  }

  // Дата в формате YYYY-MM-DD
  async getUnclosedAttendancesList(localDatetime: string, coachId?: string) {
    const sqlDatetime = utcToSql(localToUtc(localDatetime))

    const queryBuilder = this.viewRepo
      .createQueryBuilder("abv")
      .where("abv.isFreeze = :isFreeze", { isFreeze: 0 })
      .andWhere("abv.endDate < :endDate", { endDate: sqlDatetime })
      .orderBy("startDate", "DESC");

    if (coachId) {
      queryBuilder.andWhere("JSON_EXTRACT(abv.coach, '$.id') = :coachId", {
        coachId
      });
    }

    return await queryBuilder.getMany();
  }

  async hasTrialAttendanceBefore(studentId: string) {
    const isExist = await this.tableRepo.exists({
      where: {
        studentId: studentId,
        type: "TRIAL"
      },
      order: {
        startDate: "DESC"
      }
    });

    return isExist
  }

  // Дата в формате YYYY-MM-DD
  async hasByPresetAttendances(attendanceDate: string, presetId: string) {
    const year = attendanceDate.slice(0, 4);
    const month = attendanceDate.slice(5, 7);
    const day = attendanceDate.slice(8, 10);

    const attendanceList = await this.viewRepo.createQueryBuilder("abv")
      .where("EXTRACT(DAY FROM abv.startDate) = :day", { day })
      .andWhere("EXTRACT(MONTH FROM abv.startDate) = :month", { month })
      .andWhere("EXTRACT(YEAR FROM abv.startDate) = :year", { year })
      .andWhere("preset_id = :presetId", { presetId })
      .getMany();

    return Boolean(attendanceList.length);
  }


  async getFutureAttendancesByGroupId(studentsGroupId: string, localDatetime: string) {
    const sqlDatetime = utcToSql(localToUtc(localDatetime))

    const queryBuilder = this.viewRepo
      .createQueryBuilder("abv")
      .where("abv.type = 'GROUP'")
      .andWhere("abv.startDate > :startDate", { startDate: sqlDatetime })
      .andWhere("JSON_EXTRACT(abv.group, '$.id') = :groupId", { groupId: studentsGroupId })
      .orderBy("startDate", "ASC");

    return await queryBuilder.getMany();
  }

  async getNextAttendanceByStudentId(studentId: string) {
    const queryBuilder = this.viewRepo
      .createQueryBuilder("abv")
      .where("abv.startDate > NOW()")
      .andWhere("JSON_EXTRACT(abv.student, '$.id') = :studentId", { studentId: studentId })
      .orderBy("startDate", "ASC");

    return queryBuilder.getOne();
  }

  async getAttendancesForStudent(attendanceDate: string, studentId: string) {
    const year = attendanceDate.slice(0, 4);
    const month = attendanceDate.slice(5, 7);
    const day = attendanceDate.slice(8, 10);

    const queryBuilder = this.viewRepo
      .createQueryBuilder("abv")
      .where("EXTRACT(DAY FROM abv.startDate) = :day", { day: day })
      .andWhere("EXTRACT(MONTH FROM abv.startDate) = :month", { month: month })
      .andWhere("EXTRACT(YEAR FROM abv.startDate) = :year", { year: year })
      .andWhere(new Brackets((qb) => {
        qb.where("JSON_EXTRACT(abv.student, '$.id') = :studentId", { studentId: studentId })
          .orWhere("JSON_CONTAINS(JSON_EXTRACT(abv.group, '$.students'), :studentObj, '$')", { studentObj: JSON.stringify({ id: studentId }) })
      }))

    return queryBuilder.getMany();
  }

  // Используется только для отчетов
  async getAllAttendancesListByStudentId(studentId: string) {
    const attendancesList = await this.viewRepo.find({
      where: [
        // Индивидуальные занятия
        {
          student: Raw(alias => `JSON_EXTRACT(${alias}, '$.id') = :studentId`, {
            studentId
          })
        },
        // Групповые занятия (студент в группе)
        {
          group: Raw(alias =>
            `JSON_SEARCH(JSON_EXTRACT(${alias}, '$.students'), 'one', :studentId, NULL, '$[*].id') IS NOT NULL`,
            { studentId }
          )
        }
      ],
      order: {
        startDate: "DESC"
      }
    })

    return attendancesList;
  }

  // Используется только для отчетов
  async getAllAttendancesListByCoachId(coachId: string) {
    const attendancesList = await this.viewRepo.find({
      where: [
        // Индивидуальные занятия
        {
          coach: Raw(alias => `JSON_EXTRACT(${alias}, '$.id') = :coachId`, {
            coachId
          })
        },
      ],
      order: {
        startDate: "DESC"
      }
    })

    return attendancesList;
  }

  /**
   * Функция необходима для замены всех presetId на null в случае
   * удаления шаблона
   * @param attendancePresetId - ID шаблона
   */
  async removePresetIdFromAttendances(attendancePresetId: string) {
    const isUpdated = await this.tableRepo.update({ presetId: attendancePresetId }, {
      presetId: null,
    })

    return Boolean(isUpdated)
  }

  async createAttendance(attendance: Attendance) {
    const createdAttendance = this.tableRepo.create(attendance);

    return Boolean(await this.tableRepo.save(createdAttendance));
  }

  async updateAttendance(attendance: Attendance) {
    const isUpdated = await this.tableRepo.update({ id: attendance.id }, attendance)

    return Boolean(isUpdated);
  }

  async freezeAttendance(attendanceId: string) {
    const isUpdated = await this.tableRepo.update({ id: attendanceId }, { isFreeze: true })

    return Boolean(isUpdated);
  }

  async removeAttendance(attendanceId: string) {
    const isUpdated = await this.tableRepo.update({ id: attendanceId }, { isDeleted: true })

    return Boolean(isUpdated);
  }
}
