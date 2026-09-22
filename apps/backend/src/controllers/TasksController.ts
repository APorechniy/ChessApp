import type { Request, Response, NextFunction, Application } from "express";
import { TasksService } from "../services";
import { authCheck } from "../interceptors/auth-check";
import { type TaskView } from "../entities/task-view.entity";

type Query = {
  learningTopicId?: string;
};

type GetByIdQuery = {
  taskId: string;
};

type CreateTaskBody = {
  task: Omit<TaskView, "id">;
};

type UpdateTaskBody = {
  task: TaskView;
};

type RemoveTaskQuery = {
  taskId: string;
};

export class TasksController {
  constructor(
    private tasksService: TasksService,
    private logger: Console = console,
  ) { }

  async getTasks(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { learningTopicId } = req.query as Query;
      const tasksList = await this.tasksService.getTasks(learningTopicId);

      res.status(200).send({
        tasksList: tasksList,
      });

      return;
    } catch (error) {
      this.logger.error(error);
      next(error);
    }
  }

  async getTaskById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { taskId } = req.params as GetByIdQuery;

      if (!taskId) {
        throw new Error("Task ID not provided")
      }

      const task = await this.tasksService.getTaskById(taskId);

      res.status(200).send({
        task: task,
      });

      return;
    } catch (error) {
      this.logger.error(error);
      next(error);
    }
  }

  async createTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { task } = req.body as CreateTaskBody;

      if (!task || !task.learningTopic || !task.name) {
        throw new Error("Invalid task");
      }

      const isCreatedTask = await this.tasksService.createTask(task);

      if (!isCreatedTask) {
        throw new Error("Can not create task");
      }

      res.status(200).send({
        isCreatedTask: isCreatedTask,
      });

      return;
    } catch (error: any) {
      this.logger.error(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }

  async updateTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { task } = req.body as UpdateTaskBody;

      if (!task || !task.learningTopic || !task.name) {
        throw new Error("Invalid task");
      }

      const isUpdatedTask = await this.tasksService.updateTask(task);

      if (!isUpdatedTask) {
        throw new Error("Can not update task");
      }

      res.status(200).send({
        isUpdatedTask: isUpdatedTask,
      });

      return;
    } catch (error: any) {
      this.logger.error(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }

  async removeTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { taskId } = req.query as RemoveTaskQuery;

      if (!taskId) {
        throw new Error("Invalid task ID");
      }

      const isRemovedTask = await this.tasksService.removeTask(taskId);

      if (!isRemovedTask) {
        throw new Error();
      }

      res.status(200).send({
        isRemovedTask: isRemovedTask,
      });

      return;
    } catch (error: any) {
      this.logger.error(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }

  setupRoutes(app: Application) {
    app.get("/tasks/", authCheck, (req, res, next) =>
      this.getTasks(req, res, next),
    );
    app.get("/tasks/:taskId", authCheck, (req, res, next) =>
      this.getTaskById(req, res, next),
    );
    app.post("/tasks/", authCheck, (req, res, next) =>
      this.createTask(req, res, next),
    );
    app.put("/tasks/", authCheck, (req, res, next) =>
      this.updateTask(req, res, next),
    );
    app.delete("/tasks/", authCheck, (req, res, next) =>
      this.removeTask(req, res, next),
    );
  }
}
