import { Request, Response, NextFunction, Application } from "express";
import { ChessOpeningsService } from "../services";
import { authCheck } from "../interceptors/auth-check";
import { type ChessOpening } from "../entities/chess-opening.entity";

type CreateChessOpeningBody = {
  chessOpening: Omit<ChessOpening, "id">;
};

export class ChessOpeningsController {
  constructor(
    private chessOpeningsService: ChessOpeningsService,
    private logger: Console = console,
  ) { }

  async getChessOpenings(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const chessOpeningsList =
        await this.chessOpeningsService.getChessOpenings();

      res.status(200).send({
        chessOpeningsList: chessOpeningsList,
      });

      return;
    } catch (error: any) {
      this.logger.error(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }

  async createChessOpening(req: Request, res: Response, next: NextFunction) {
    try {
      const { chessOpening } = req.body as CreateChessOpeningBody;

      if (!chessOpening) {
        throw new Error("chessOpening is null");
      }

      const isCreatedChessOpening =
        await this.chessOpeningsService.createChessOpening(chessOpening);

      if (!isCreatedChessOpening) {
        throw new Error("Can not create chess opening");
      }

      res.status(200).send({
        isCreatedChessOpening: isCreatedChessOpening,
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
    app.get("/chess-openings/", authCheck, (req, res, next) =>
      this.getChessOpenings(req, res, next),
    );
    app.post("/chess-openings/", authCheck, (req, res, next) =>
      this.createChessOpening(req, res, next),
    );
  }
}
