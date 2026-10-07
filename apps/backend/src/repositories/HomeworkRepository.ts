import { type DataSource, Repository, In } from "typeorm";
import { Homework, HomeworkSolution, HomeworkTask, HomeworkView } from "@/entities";

export class HomeworkRepository {
    private tableRepo: Repository<Homework>;
    private taskRepo: Repository<HomeworkTask>;
    private viewRepo: Repository<HomeworkView>;
    private solutionsRepo: Repository<HomeworkSolution>;

    constructor(dataSource: DataSource) {
        this.tableRepo = dataSource.getRepository(Homework);
        this.taskRepo = dataSource.getRepository(HomeworkTask);
        this.viewRepo = dataSource.getRepository(HomeworkView);
        this.solutionsRepo = dataSource.getRepository(HomeworkSolution);
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

    async getTasksByHomeworkId(homeworkId: string): Promise<HomeworkTask[]> {
        return await this.taskRepo.find({
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
    async addHomeworkSolution(homeworkSolution: HomeworkSolution): Promise<HomeworkSolution> {
        const created = this.solutionsRepo.create(homeworkSolution);
        return await this.solutionsRepo.save(created);
    }

    async addHomeworkSolutions(homeworkSolution: HomeworkSolution[]): Promise<HomeworkSolution[]> {
        const created = this.solutionsRepo.create(homeworkSolution);
        return await this.solutionsRepo.save(created);
    }
}