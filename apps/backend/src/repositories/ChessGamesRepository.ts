import { type DataSource, Raw, Repository } from "typeorm";
import { ChessGame } from "../entities/chess-game.entity";
import { ChessGameView } from "../entities/chess-game-view.entity";
export class ChessGamesRepository {
  private tableRepo: Repository<ChessGame>;
  private viewRepo: Repository<ChessGameView>;

  constructor(dataSource: DataSource) {
    this.tableRepo = dataSource.getRepository(ChessGame);
    this.viewRepo = dataSource.getRepository(ChessGameView);
  }

  async getChessGames(): Promise<ChessGameView[]> {
    const rows = await this.viewRepo.find()

    return rows;
  }

  async getChessGamesByChessOpeningId(
    chessOpeningId: string,
  ): Promise<ChessGameView[]> {
    const rows = await this.viewRepo.find({
      where: {
        chessOpening: Raw(
          (alias) => `${alias}->'$.id' = :chessOpeningId`,
          {
            chessOpeningId
          }
        )
      }
    })

    return rows;
  }

  async createChessGame(chessGame: ChessGame): Promise<ChessGame> {
    const createdChessGame = this.tableRepo.create(chessGame);

    return await this.tableRepo.save(createdChessGame);
  }
}
