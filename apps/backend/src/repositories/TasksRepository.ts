import { type Repository, type DataSource, Raw } from "typeorm";
import { Task } from "../entities/task.entity";
import { TaskView } from "../entities/task-view.entity";
export class TasksRepository {
  private tableRepo: Repository<Task>;
  private viewRepo: Repository<TaskView>;

  constructor(dataSource: DataSource) {
    this.tableRepo = dataSource.getRepository(Task);
    this.viewRepo = dataSource.getRepository(TaskView);
  }

  async getTasksByLearningTopicId(learningTopicId: string) {
    const tasksList = await this.viewRepo.find({
      where: {
        learningTopic: Raw((alias) => `(${alias}->'$.id') = :id`, {
          id: learningTopicId
        })
      },
      order: {
        name: {
          direction: "ASC"
        }
      }
    })

    return tasksList;
  }

  async getTasks() {
    const tasksList = await this.viewRepo.find({
      order: {
        name: {
          direction: "ASC"
        }
      }
    })

    return tasksList;
  }

  async getTaskById(taskId: string) {
    const task = await this.viewRepo.findOne({
      where: {
        id: taskId
      }
    })

    return task;
  }

  async createTask(task: Task) {
    const createdTask = this.tableRepo.create(task);

    return Boolean(await this.tableRepo.save(createdTask));
  }

  async updateTask(task: Task) {
    const isUpdated = await this.tableRepo.update({ id: task.id }, task)

    return Boolean(isUpdated);
  }

  async removeTask(taskId: string) {
    const isUpdated = await this.tableRepo.update({ id: taskId }, { isRemoved: true })

    return Boolean(isUpdated);
  }
}
