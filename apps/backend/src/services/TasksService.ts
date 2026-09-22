import { type TaskView } from "../entities/task-view.entity";
import { type Task } from "../entities/task.entity";
import type { TasksRepository } from "../repositories";
import { v4 as uuidv4 } from "uuid";

export class TasksService {
  constructor(private taskRepository: TasksRepository) { }

  async getTasks(learningTopicId?: string): Promise<TaskView[] | null> {
    try {
      const tasksList = learningTopicId
        ? await this.taskRepository.getTasksByLearningTopicId(learningTopicId)
        : await this.taskRepository.getTasks();

      return tasksList;
    } catch (error) {
      throw error;
    }
  }

  async getTaskById(taskId: string): Promise<TaskView | null> {
    try {
      const task = await this.taskRepository.getTaskById(taskId);

      return task;
    } catch (error) {
      throw error;
    }
  }

  async createTask(taskWithoutId: Omit<TaskView, "id">): Promise<boolean> {
    const task: Task = {
      id: uuidv4(),
      name: taskWithoutId.name,
      learningTopicId: taskWithoutId.learningTopic.id,
      qualityId: taskWithoutId.quality.id,
      position: taskWithoutId.position,
      isRemoved: false
    };

    return await this.taskRepository.createTask(task);
  }

  async updateTask(taskView: TaskView): Promise<boolean> {
    const task: Task = {
      id: taskView.id,
      name: taskView.name,
      learningTopicId: taskView.learningTopic.id,
      qualityId: taskView.quality.id,
      position: taskView.position,
      isRemoved: false
    };

    return await this.taskRepository.updateTask(task);
  }

  async removeTask(taskId: string): Promise<boolean> {
    return await this.taskRepository.removeTask(taskId);
  }
}
