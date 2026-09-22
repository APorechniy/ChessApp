import type { Request, Response, NextFunction, Application } from "express";
import { ChessGamesService } from "../services";
import { authCheck } from "../interceptors/auth-check";
import { type ChessGameView } from "../entities/chess-game-view.entity";

type GetChessGamesQuery = {
  chessOpeningId: string;
};

type CreateChessGameBody = {
  chessGame: Omit<ChessGameView, "id">;
};

export class ChessGamesController {
  constructor(
    private chessGamesService: ChessGamesService,
    private logger: Console = console,
  ) { }

  async getChessGames(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { chessOpeningId } = req.query as GetChessGamesQuery;

      let chessGamesList: ChessGameView[] | null = [];

      if (chessOpeningId) {
        chessGamesList =
          await this.chessGamesService.getChessGamesByChessOpeningId(
            chessOpeningId,
          );
      } else {
        chessGamesList = await this.chessGamesService.getChessGames();
      }

      res.status(200).send({
        chessGamesList: chessGamesList,
      });

      return;
    } catch (error: any) {
      this.logger.error(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }

  async createChessGame(req: Request, res: Response, next: NextFunction) {
    try {
      const { chessGame } = req.body as CreateChessGameBody;

      if (
        !chessGame ||
        !chessGame.whitePlayer ||
        !chessGame.blackPlayer ||
        !chessGame.year ||
        !chessGame.chessOpening
      ) {
        throw new Error("Invalid chess game");
      }

      const isCreatedChessGame =
        await this.chessGamesService.createChessGame(chessGame);

      if (!isCreatedChessGame) {
        throw new Error("Can not create chess game");
      }

      res.status(200).send({
        isCreatedChessGame: isCreatedChessGame,
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
    app.get("/chess-games/", authCheck, (req, res, next) =>
      this.getChessGames(req, res, next),
    );
    app.post("/chess-games/", authCheck, (req, res, next) =>
      this.createChessGame(req, res, next),
    );
  }
}
