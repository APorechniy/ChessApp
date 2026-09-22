import { type Repository, type DataSource } from "typeorm";
import { StudentsAttended } from "../entities/students-attended.entity";
import { StudentsAttendedView } from "../entities/students-attended-view.entity";

// Репозиторий для линковки студентов и занятий как флаг посещения
// по связи "многие ко многим"
export class StudentsAttendedRepository {
    private tableRepo: Repository<StudentsAttended>;
    private viewRepo: Repository<StudentsAttendedView>;

    constructor(dataSource: DataSource) {
        this.tableRepo = dataSource.getRepository(StudentsAttended);
        this.viewRepo = dataSource.getRepository(StudentsAttendedView);
    }

    async getStudentsAttendedByAttendanceId(attendanceId: string) {
        const studentsAttended = await this.viewRepo.find({
            where: {
                attendanceId: attendanceId
            }
        })

        return studentsAttended
    }

    async getIsAttended(studentId: string, attendanceId: string) {
        const studentAttended = await this.tableRepo.findOne({
            where: {
                studentId: studentId,
                attendanceId: attendanceId
            }
        })

        return studentAttended?.attended
    }

    async createNewLink(studentId: string, attendanceId: string) {
        const createdStudentsAttended = this.tableRepo.create({
            attendanceId: attendanceId,
            studentId: studentId
        })

        return Boolean(await this.tableRepo.save(createdStudentsAttended))
    }

    async hasLink(studentId: string, attendanceId: string) {
        const isExist = await this.tableRepo.exists({
            where: {
                studentId: studentId,
                attendanceId: attendanceId
            }
        })

        return isExist
    }

    async markAsAttended(studentId: string, attendanceId: string) {
        const isUpdated =
            await this.tableRepo.update({ studentId: studentId, attendanceId: attendanceId }, { attended: true })

        return Boolean(isUpdated);
    }

    async markAsNotAttended(studentId: string, attendanceId: string) {
        const isUpdated =
            await this.tableRepo.update({ studentId: studentId, attendanceId: attendanceId }, { attended: false })

        return Boolean(isUpdated);
    }

    async removeAllStudentsFromAttendance(attendanceId: string) {
        const isDeleted = await this.tableRepo.delete({
            attendanceId: attendanceId
        })

        return Boolean(isDeleted);
    }
}
