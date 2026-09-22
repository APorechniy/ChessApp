import { type ChessOpening } from "../entities/chess-opening.entity";
import type { ChessOpeningsRepository } from "../repositories";
import { v4 as uuidv4 } from "uuid";

export class ChessOpeningsService {
  constructor(private chessOpeningsRepository: ChessOpeningsRepository) { }

  async getChessOpenings(): Promise<ChessOpening[] | null> {
    try {
      // Добавить валидацию

      const chessOpeningsList =
        await this.chessOpeningsRepository.getChessOpenings();

      return chessOpeningsList;
    } catch (error) {
      throw error;
    }
  }

  async createChessOpening(
    chessOpeningWithoutId: Omit<ChessOpening, "id">,
  ): Promise<boolean> {
    if (!chessOpeningWithoutId.name) {
      throw new Error("chessOpening.name is null");
    }

    const chessOpening: ChessOpening = {
      id: uuidv4(),
      ...chessOpeningWithoutId,
    };

    return Boolean(await this.chessOpeningsRepository.createChessOpening(chessOpening));
  }
}
