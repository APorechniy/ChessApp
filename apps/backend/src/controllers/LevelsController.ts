import { Request, Response, NextFunction, Application } from "express";
import { LevelsService } from "../services";
import { authCheck } from "../interceptors/auth-check";

export class LevelsController {
  constructor(
    private levelsService: LevelsService,
    private logger: Console = console,
  ) {}

  async getLevels(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const levelsList = await this.levelsService.getLevels();

      res.status(200).send({
        levelsList: levelsList,
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
    app.get("/levels/", authCheck, (req, res, next) =>
      this.getLevels(req, res, next),
    );
  }
}
