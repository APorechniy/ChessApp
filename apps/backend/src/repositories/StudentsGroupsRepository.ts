import { type Repository, type DataSource } from "typeorm";
import { StudentsGroup } from "../entities/students-group.entity";
import { StudentsGroupView } from "../entities/students-group-view.entity";

export class StudentsGroupsRepository {
    private tableRepo: Repository<StudentsGroup>;
    private viewRepo: Repository<StudentsGroupView>;

    constructor(dataSource: DataSource) {
        this.tableRepo = dataSource.getRepository(StudentsGroup);
        this.viewRepo = dataSource.getRepository(StudentsGroupView);
    }

    async getStudentsGroupById(studentsGroupId: string) {
        const [studentsGroup] = await this.viewRepo.find({
            where: {
                id: studentsGroupId
            }
        })

        return studentsGroup;
    }

    async getStudentsGroups() {
        const studentsGroups = await this.viewRepo.find()

        return studentsGroups;
    }

    async createStudentsGroup(studentsGroup: StudentsGroup) {
        const createdStudentsGroup = this.tableRepo.create(studentsGroup);

        return Boolean(await this.tableRepo.save(createdStudentsGroup));
    }

    async updateStudentsGroup(studentsGroup: StudentsGroup) {
        const isUpdated = Boolean(await this.tableRepo.update({ id: studentsGroup.id }, studentsGroup))

        return isUpdated;
    }

    async deleteStudentsGroup(studentsGroupId: string) {
        const isUpdated = Boolean(await this.tableRepo.update({ id: studentsGroupId }, { isDeleted: true }))

        return isUpdated;
    }
}
