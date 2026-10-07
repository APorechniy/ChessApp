import { type HomeworkRepository } from "@/repositories/HomeworkRepository";
import { v4 as uuidv4 } from "uuid";
import { HomeworkSolution, type HomeworkTask, type StudentsAttendedView, type Homework, HomeworkView } from "@/entities";
import { HomeworkSolutionStatus } from "@/entities/homework-solution.entity";

export class HomeworksService {
    constructor(private homeworksRepository: HomeworkRepository) { }

    async getHomeworkByAttendanceId(attendanceId: string): Promise<Homework | null> {
        return (await this.homeworksRepository.getHomeworksByAttendanceId(attendanceId))
    }

    async createHomework(
        homeworkWithoutId: Omit<HomeworkView, "id">,
    ): Promise<boolean> {
        const homework: Homework = {
            id: uuidv4(),
            ...homeworkWithoutId,
        };

        const homeworkTasks: HomeworkTask[] = homeworkWithoutId.tasks.map((ti, idx) => ({
            id: uuidv4(),
            orderIndex: idx,
            homeworkId: homework.id,
            taskId: ti.id,
        }))

        const isCreatedHomework = await this.homeworksRepository.createHomework(homework)
        const isAddedTasks = await this.homeworksRepository.addTasks(homeworkTasks)

        return Boolean(isCreatedHomework && isAddedTasks);
    }

    async freezeHomework(
        homework: HomeworkView,
        studentsAttended: StudentsAttendedView[]
    ): Promise<boolean> {
        const homeworksSolutions: HomeworkSolution[] = studentsAttended.map((sa) => ({
            id: uuidv4(),
            studentId: sa.student.id,
            homeworkId: homework.id,
            status: HomeworkSolutionStatus.New,
            startedAt: null,
            finishedAt: null,
        }))

        const isUpdatedHomework = await this.homeworksRepository.updateHomework(homework)
        const isAddedSolutions = await this.homeworksRepository.addHomeworkSolutions(homeworksSolutions)

        return Boolean(isUpdatedHomework && isAddedSolutions);
    }

    async updateHomework(
        homework: HomeworkView,
    ): Promise<boolean> {
        const isUpdatedHomework = await this.homeworksRepository.updateHomework(homework)

        if (isUpdatedHomework) {
            const currentTasks: HomeworkTask[] = await this.homeworksRepository.getTasksByHomeworkId(homework.id)
            const excludedTasks = currentTasks.filter((ct) => !(homework.tasks.some(ht => ht.id === ct.taskId))).map(t => t.id)
            const newTasks = homework.tasks.filter((ht) => !(currentTasks.some(ct => ct.taskId === ht.id))).map((ht, idx) => ({
                id: uuidv4(),
                orderIndex: idx,
                homeworkId: homework.id,
                taskId: ht.id,
            }))

            await this.homeworksRepository.removeTasksByIds(excludedTasks)
            await this.homeworksRepository.addTasks(newTasks)
        }

        return Boolean(isUpdatedHomework);
    }

    async deleteHomework(homeworkId: string): Promise<boolean> {
        return await this.homeworksRepository.deleteHomework(homeworkId)
    }
}
