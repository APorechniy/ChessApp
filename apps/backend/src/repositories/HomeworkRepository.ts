import { type DataSource, Repository, In } from "typeorm";
import { Homework, HomeworkTask } from "@/entities";

export class HomeworkRepository {
    private tableRepo: Repository<Homework>;
    private taskRepo: Repository<HomeworkTask>;

    constructor(dataSource: DataSource) {
        this.tableRepo = dataSource.getRepository(Homework);
        this.taskRepo = dataSource.getRepository(HomeworkTask);
    }

    async getHomeworks(): Promise<Homework[]> {
        return await this.tableRepo.find();
    }

    async getHomeworkById(id: string): Promise<Homework | null> {
        return await this.tableRepo.findOne({ where: { id } });
    }

    async getHomeworksByAttendanceId(attendanceId: string): Promise<Homework[]> {
        return await this.tableRepo.find({ where: { attendanceId } });
    }

    async getHomeworkWithTasks(id: string): Promise<{ homework: Homework; tasks: HomeworkTask[] } | null> {
        const homework = await this.tableRepo.findOne({ where: { id } });
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

    async deleteHomework(id: string): Promise<void> {
        await this.tableRepo.delete({ id });
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
}