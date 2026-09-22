import { Level } from "../entities/level.entity";
import { LevelView } from "../entities/level-view.entity";
import { type Repository, type DataSource } from "typeorm";

export class LevelsRepository {
  private tableRepo: Repository<Level>;
  private viewRepo: Repository<LevelView>;

  constructor(dataSource: DataSource) {
    this.tableRepo = dataSource.getRepository(Level);
    this.viewRepo = dataSource.getRepository(LevelView);
  }

  async getLevels() {
    const levelsList = await this.viewRepo.find()

    return levelsList;
  }
}
