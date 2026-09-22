import type { StudentsAttendedRepository } from "../repositories";
import { type StudentsAttendedView } from "../entities/students-attended-view.entity";

export class StudentsAttendedService {
    constructor(
        private studentsAttendedRepository: StudentsAttendedRepository,
    ) { }

    async getStudentsAttendedByAttendanceId(attendanceId: string): Promise<StudentsAttendedView[]> {
        try {
            const studentsAttended = await this.studentsAttendedRepository.getStudentsAttendedByAttendanceId(attendanceId);

            return studentsAttended;
        } catch (error) {
            throw error;
        }
    }
}
