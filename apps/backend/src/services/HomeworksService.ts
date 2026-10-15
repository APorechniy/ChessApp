import { type HomeworkRepository } from "@/repositories/HomeworkRepository";
import { v4 as uuidv4 } from "uuid";
import { HomeworkSolution, type HomeworkTask, type StudentsAttendedView, type Homework, HomeworkView, HomeworkSolutionView, HomeworkTasksView, SolutionAnswer, SolutionAnswerView } from "@/entities";
import { HomeworkSolutionStatus } from "@/entities/homework-solution.entity";

export class HomeworksService {
    constructor(private homeworksRepository: HomeworkRepository) { }

    async getHomeworksList(): Promise<Homework[] | null> {
        return (await this.homeworksRepository.getHomeworks())
    }

    async getHomeworkByAttendanceId(attendanceId: string): Promise<Homework | null> {
        return (await this.homeworksRepository.getHomeworksByAttendanceId(attendanceId))
    }

    async getHomeworkByStudentId(studentId: string): Promise<Homework[] | null> {
        return (await this.homeworksRepository.getHomeworksByStudentId(studentId))
    }

    async getSolutionsListByHomeworkId(homeworkId: string): Promise<HomeworkSolutionView[]> {
        return (await this.homeworksRepository.getSolutionsListByHomeworkId(homeworkId))
    }

    async getHomeworkTasks(homeworkId: string): Promise<HomeworkTasksView[]> {
        return (await this.homeworksRepository.getTasksByHomeworkId(homeworkId))
    }

    async getSolutionByStudentkId(homeworkId: string, studentId: string): Promise<HomeworkSolutionView | null> {
        return (await this.homeworksRepository.getSolutionByStudentId(homeworkId, studentId))
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
            const currentTasks: HomeworkTasksView[] = await this.homeworksRepository.getTasksByHomeworkId(homework.id)
            const excludedTasks = currentTasks.filter((ct) => !(homework.tasks.some(ht => ht.id === ct.task?.id))).map(t => t.id)
            const newTasks = homework.tasks.filter((ht) => !(currentTasks.some(ct => ct.task?.id === ht.id))).map((ht, idx) => ({
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

    // Решения студентов
    async updateHomeworkSolution(homeworkSolution: HomeworkSolutionView): Promise<boolean> {
        const homeworkSolutionUpdated: HomeworkSolution = {
            id: homeworkSolution.id,
            status: homeworkSolution.status,
            startedAt: homeworkSolution.startedAt,
            finishedAt: homeworkSolution.finishedAt,
            studentId: homeworkSolution.student?.id as string,
            homeworkId: homeworkSolution.homework?.id as string
        }

        return await this.homeworksRepository.updateHomeworkSolution(homeworkSolutionUpdated)
    }

    // Ответы студентов
    async getSolutionAnswers(homeworkId: string, solutionId: string): Promise<SolutionAnswerView[]> {
        return await this.homeworksRepository.getSolutionAnswers(homeworkId, solutionId);
    }

    async addSolutionAnswer(solutionAnswer: Omit<SolutionAnswer, "id">): Promise<boolean> {
        const fullAnswer = {
            id: uuidv4(),
            ...solutionAnswer
        }
        const created = Boolean(await this.homeworksRepository.addSolutionAnswer(fullAnswer))

        return created
    }

    async updateSolutionAnswer(solutionAnswer: SolutionAnswerView): Promise<boolean> {
        const solutionAnswerDto: SolutionAnswer = {
            id: solutionAnswer.id,
            homeworkId: solutionAnswer.homeworkId,
            homeworkSolutionId: solutionAnswer.homeworkSolutionId,
            homeworkTaskId: solutionAnswer.homeworkTask.id,
            answerText: solutionAnswer.answerText,
            startedAt: solutionAnswer.startedAt,
            submittedAt: solutionAnswer.submittedAt,
            checkedAt: solutionAnswer.checkedAt,
            status: solutionAnswer.status,
            coachComment: solutionAnswer.coachComment,
        }
        const updated = Boolean(await this.homeworksRepository.updateSolutionAnswer(solutionAnswerDto))

        return updated
    }
}
