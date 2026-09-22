import { type ChessGameView } from "../entities/chess-game-view.entity";
import { type ChessGame } from "../entities/chess-game.entity";
import type { ChessGamesRepository } from "../repositories";
import { v4 as uuidv4 } from "uuid";

export class ChessGamesService {
  constructor(private chessGamesRepository: ChessGamesRepository) { }

  async getChessGames(): Promise<ChessGameView[] | null> {
    try {
      const chessGamesList = await this.chessGamesRepository.getChessGames();

      return chessGamesList;
    } catch (error) {
      throw error;
    }
  }

  async getChessGamesByChessOpeningId(
    chessOpeningId: string,
  ): Promise<ChessGameView[] | null> {
    try {
      const chessGamesList =
        await this.chessGamesRepository.getChessGamesByChessOpeningId(
          chessOpeningId,
        );

      return chessGamesList;
    } catch (error) {
      throw error;
    }
  }

  async createChessGame(
    chessGameWithoutId: Omit<ChessGameView, "id">,
  ): Promise<boolean> {
    const chessGame: ChessGame = {
      id: uuidv4(),
      ...chessGameWithoutId,
      chessOpeningId: chessGameWithoutId.chessOpening.id,
    };

    return Boolean(await this.chessGamesRepository.createChessGame(chessGame));
  }
}
