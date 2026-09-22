import { ChessOpening } from "../entities/chess-opening.entity";
import { type Repository, type DataSource } from "typeorm";

export class ChessOpeningsRepository {
  private repo: Repository<ChessOpening>;

  constructor(dataSource: DataSource) {
    this.repo = dataSource.getRepository(ChessOpening);
  }

  async getChessOpenings(): Promise<ChessOpening[]> {
    const rows = await this.repo.find({
      order: {
        name: {
          direction: "ASC"
        }
      }
    })

    return rows;
  }

  async createChessOpening(chessOpening: ChessOpening): Promise<ChessOpening> {
    const createdChessOpening = this.repo.create(chessOpening)

    return await this.repo.save(createdChessOpening);
  }
}
