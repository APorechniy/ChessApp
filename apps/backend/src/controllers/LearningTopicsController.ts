import type { Request, Response, NextFunction, Application } from "express";
import type { LearningTopicService } from "../services";
import { authCheck } from "../interceptors/auth-check";
import { type LearningTopicView } from "../entities/learning-topic-view.entity";

type GetLearningTopicsQuery = {
  levelId?: string;
};

type CreateLearningTopicBody = {
  learningTopic: Omit<LearningTopicView, "id">;
};

type RemoveLearningTopicQuery = {
  learningTopicId: string;
};

export class LearningTopicsController {
  constructor(
    private learningTopicsService: LearningTopicService,
    private logger: Console = console,
  ) { }

  async getLearningTopics(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { levelId } = req.query as GetLearningTopicsQuery;

      const learningTopicsList =
        await this.learningTopicsService.getLearningTopics(levelId);

      res.status(200).send({
        learningTopicsList: learningTopicsList,
      });

      return;
    } catch (error: any) {
      this.logger.error(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }

  async createLearningTopic(req: Request, res: Response, next: NextFunction) {
    try {
      const { learningTopic } = req.body as CreateLearningTopicBody;

      if (
        !learningTopic ||
        !learningTopic.name ||
        !learningTopic.level
      ) {
        throw new Error("Invalid learning topic");
      }

      const isCreatedLearningTopic =
        await this.learningTopicsService.createLearningTopic(learningTopic);

      if (!isCreatedLearningTopic) {
        throw new Error("Can not create learning topic");
      }

      res.status(200).send({
        isCreatedLearningTopic: isCreatedLearningTopic,
      });

      return;
    } catch (error: any) {
      this.logger.error(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }

  async updateLearningTopic(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { learningTopic } = req.body as {
        learningTopic: LearningTopicView;
      };

      if (
        !learningTopic ||
        !learningTopic.id ||
        !learningTopic.name ||
        !learningTopic.level
      ) {
        throw new Error("Invalid learning topic");
      }

      const isUpdateLearningTopic =
        await this.learningTopicsService.updateLearningTopic(learningTopic);

      res.status(200).send({
        isUpdateLearningTopic: isUpdateLearningTopic,
      });

      return;
    } catch (error: any) {
      this.logger.error(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }

  async removeLearningTopic(req: Request, res: Response, next: NextFunction) {
    try {
      const { learningTopicId } = req.query as RemoveLearningTopicQuery;

      if (!learningTopicId) {
        throw new Error("Invalid learning topic ID");
      }

      const isRemoveLearningTopic =
        await this.learningTopicsService.removeLearningTopic(learningTopicId);

      if (!isRemoveLearningTopic) {
        throw new Error();
      }

      res.status(200).send({
        isRemoveLearningTopic: isRemoveLearningTopic,
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
    app.get("/learning-topics/", authCheck, (req, res, next) =>
      this.getLearningTopics(req, res, next),
    );
    app.post("/learning-topics/", authCheck, (req, res, next) =>
      this.createLearningTopic(req, res, next),
    );
    app.put("/learning-topics", authCheck, (req, res, next) =>
      this.updateLearningTopic(req, res, next),
    );
    app.delete("/learning-topics", authCheck, (req, res, next) =>
      this.removeLearningTopic(req, res, next),
    );
  }
}
