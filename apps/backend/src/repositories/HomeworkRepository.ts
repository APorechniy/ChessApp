import { type DataSource, Repository, In } from "typeorm";
import { Homework, HomeworkSolution, HomeworkSolutionView, HomeworkTask, HomeworkTasksView, HomeworkView, SolutionAnswer } from "@/entities";

export class HomeworkRepository {
    private tableRepo: Repository<Homework>;
    private taskRepo: Repository<HomeworkTask>;
    private viewRepo: Repository<HomeworkView>;
    private tasksViewRepo: Repository<HomeworkTasksView>;
    private solutionsRepo: Repository<HomeworkSolution>;
    private solutionsView: Repository<HomeworkSolutionView>;
    private solutionAnswersRepo: Repository<SolutionAnswer>;

    constructor(dataSource: DataSource) {
        this.tableRepo = dataSource.getRepository(Homework);
        this.taskRepo = dataSource.getRepository(HomeworkTask);
        this.viewRepo = dataSource.getRepository(HomeworkView);
        this.tasksViewRepo = dataSource.getRepository(HomeworkTasksView);
        this.solutionsRepo = dataSource.getRepository(HomeworkSolution);
        this.solutionsView = dataSource.getRepository(HomeworkSolutionView);
        this.solutionAnswersRepo = dataSource.getRepository(SolutionAnswer);
    }

    async getHomeworks(): Promise<Homework[]> {
        return await this.viewRepo.find();
    }

    async getHomeworkById(id: string): Promise<Homework | null> {
        return await this.viewRepo.findOne({ where: { id } });
    }

    async getHomeworksByAttendanceId(attendanceId: string): Promise<Homework | null> {
        return await this.viewRepo.findOne({ where: { attendanceId } });
    }

    async getHomeworksByStudentId(studentId: string): Promise<Homework[]> {
        const homeworks = await this.viewRepo
            .createQueryBuilder('homework')
            .innerJoin(
                'homework_solutions',
                'solution',
                'solution.studentId = :studentId',
                { studentId }
            )
            .getMany();

        return homeworks
    }

    async getHomeworkWithTasks(id: string): Promise<{ homework: Homework; tasks: HomeworkTask[] } | null> {
        const homework = await this.viewRepo.findOne({ where: { id } });
        if (!homework) return null;

        const tasks = await this.taskRepo.find({
            where: { homeworkId: id },
            order: { orderIndex: "ASC" },
        });

        return { homework, tasks };
    }

    async createHomework(homework: Homework): Promise<Homework> {
        const created = this.tableRepo.create(homework);
        return await this.tableRepo.save(created);
    }

    async updateHomework(homework: Homework): Promise<Homework> {
        return await this.tableRepo.save(homework);
    }

    async deleteHomework(id: string): Promise<boolean> {
        return Boolean(await this.tableRepo.delete({ id }));
    }

    // ─── задачи внутри агрегата ──────────────────────────────
    async addTask(task: HomeworkTask): Promise<HomeworkTask> {
        const created = this.taskRepo.create(task);
        return await this.taskRepo.save(created);
    }

    async addTasks(tasks: HomeworkTask[]): Promise<HomeworkTask[]> {
        const created = this.taskRepo.create(tasks);
        return await this.taskRepo.save(created);
    }

    async getTasksByHomeworkId(homeworkId: string): Promise<HomeworkTasksView[]> {
        return await this.tasksViewRepo.find({
            where: { homeworkId },
            order: { orderIndex: "ASC" },
        });
    }

    async getTaskById(id: string): Promise<HomeworkTask | null> {
        return await this.taskRepo.findOne({ where: { id } });
    }

    async removeTask(id: string): Promise<void> {
        await this.taskRepo.delete({ id });
    }

    async removeTasksByIds(ids: string[]): Promise<void> {
        if (ids.length === 0) return;
        await this.taskRepo.delete({ id: In(ids) });
    }

    // Решения студентов (записи о наличии самих решений)
    async getSolutionsListByHomeworkId(homeworkId: string): Promise<HomeworkSolutionView[]> {
        const homeworkSolutionsList = await this.solutionsView.createQueryBuilder("sv")
            .where("JSON_EXTRACT(sv.homework, '$.id') = :homeworkId", { homeworkId })
            .getMany();

        return homeworkSolutionsList
    }

    async getSolutionByStudentId(homeworkId: string, studentId: string): Promise<HomeworkSolutionView | null> {
        const homeworkSolution = await this.solutionsView.createQueryBuilder("sv")
            .where("JSON_EXTRACT(sv.homework, '$.id') = :homeworkId", { homeworkId })
            .andWhere("JSON_EXTRACT(sv.student, '$.id') = :studentId", { studentId })
            .getOne();

        return homeworkSolution
    }

    async addHomeworkSolution(homeworkSolution: HomeworkSolution): Promise<HomeworkSolution> {
        const created = this.solutionsRepo.create(homeworkSolution);
        return await this.solutionsRepo.save(created);
    }

    async addHomeworkSolutions(homeworkSolution: HomeworkSolution[]): Promise<HomeworkSolution[]> {
        const created = this.solutionsRepo.create(homeworkSolution);
        return await this.solutionsRepo.save(created);
    }

    async updateHomeworkSolution(homeworkSolution: HomeworkSolution): Promise<boolean> {
        const updated = await this.solutionsRepo.update({ id: homeworkSolution.id }, homeworkSolution);
        return Boolean(updated);
    }

    // Ответы учеников
    async addSolutionAnswer(solutionAnswer: SolutionAnswer): Promise<SolutionAnswer> {
        const created = this.solutionAnswersRepo.create(solutionAnswer);
        return await this.solutionAnswersRepo.save(created)
    }
}