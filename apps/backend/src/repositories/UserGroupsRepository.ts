import { type Repository, type DataSource } from "typeorm";
import { UserGroup } from "../entities/user-group.entity";

// Репозиторий для линковки студентов и групп
// по связи "многие ко многим"
export class UserGroupsRepository {
    private tableRepo: Repository<UserGroup>;

    constructor(dataSource: DataSource) {
        this.tableRepo = dataSource.getRepository(UserGroup);
    }

    async includeStudentInGroup(studentId: string, groupId: string) {
        const createdUserGroup = this.tableRepo.create({
            studentId: studentId,
            studentsGroupId: groupId
        })

        return Boolean(await this.tableRepo.save(createdUserGroup));
    }

    async removeStudentFromGroup(studentId: string, groupId: string) {
        const isDeleted = await this.tableRepo.delete({
            studentId: studentId,
            studentsGroupId: groupId,
        })

        return Boolean(isDeleted?.affected);
    }

    async removeAllStudentFromGroup(groupId: string) {
        const isDeleted = await this.tableRepo.delete({
            studentsGroupId: groupId,
        })

        return Boolean(isDeleted?.affected);
    }
}
