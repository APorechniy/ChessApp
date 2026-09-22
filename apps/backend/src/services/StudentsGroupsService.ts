import type {
    AttendancesRepository,
    StudentsAttendedRepository,
    StudentsGroupsRepository,
    UserGroupsRepository
} from "../repositories";
import { v4 as uuidv4 } from 'uuid'
import { type StudentsGroup } from "../entities/students-group.entity";
import { type StudentsGroupView } from "../entities/students-group-view.entity";

export class StudentsGroupsService {
    constructor(
        private attendancesRepository: AttendancesRepository,
        private studentsAttendedRepository: StudentsAttendedRepository,
        private studentsGroupsRepository: StudentsGroupsRepository,
        private userGroupsRepository: UserGroupsRepository
    ) { }

    async getStudentsGroups(): Promise<StudentsGroupView[]> {
        try {
            const studentsGroups = await this.studentsGroupsRepository.getStudentsGroups();

            return studentsGroups;
        } catch (error) {
            throw error;
        }
    }

    async createStudentsGroup(studentsGroup: Omit<StudentsGroupView, "id">): Promise<boolean> {
        try {
            const fullGroup: StudentsGroup = {
                id: uuidv4(),
                name: studentsGroup.name,
                description: studentsGroup.description,
                color: studentsGroup.color,
                isDeleted: false,
            }

            const isCreatedGroup = await this.studentsGroupsRepository.createStudentsGroup(fullGroup);

            for (let s of studentsGroup.students) {
                await this.userGroupsRepository.includeStudentInGroup(s.id, fullGroup.id);
            }

            return isCreatedGroup
        } catch (err) {
            console.log(err)

            return false
        }
    }

    async updateStudentsGroup(studentsGroup: StudentsGroupView, localDatetime: string): Promise<boolean> {
        try {
            const transformedStudentsGroup: StudentsGroup = {
                id: studentsGroup.id,
                name: studentsGroup.name,
                description: studentsGroup.description,
                color: studentsGroup.color,
                isDeleted: false,
            }

            const isUpdatedGroup = await this.studentsGroupsRepository.updateStudentsGroup(transformedStudentsGroup);
            const isRemovedAllStudents = await this.userGroupsRepository.removeAllStudentFromGroup(studentsGroup.id);
            const futureAttendances = await this.attendancesRepository.getFutureAttendancesByGroupId(studentsGroup.id, localDatetime);

            futureAttendances.forEach(async (fa) => {
                await this.studentsAttendedRepository.removeAllStudentsFromAttendance(fa.id);
            })

            for (let s of studentsGroup.students) {
                await this.userGroupsRepository.includeStudentInGroup(s.id, studentsGroup.id);

                futureAttendances.forEach(async (fa) => {
                    await this.studentsAttendedRepository.createNewLink(s.id, fa.id)
                })
            }

            return isUpdatedGroup && isRemovedAllStudents
        } catch (err) {
            console.log(err)

            return false
        }
    }

    async deleteStudentsGroup(studentsGroupId: string): Promise<boolean> {
        return await this.studentsGroupsRepository.deleteStudentsGroup(studentsGroupId);
    }
}
