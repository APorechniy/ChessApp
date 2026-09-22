import { type LevelView } from "../entities/level-view.entity";
import type { LevelsRepository } from "../repositories";

export class LevelsService {
  constructor(private levelsRepository: LevelsRepository) { }

  async getLevels(): Promise<LevelView[] | null> {
    try {
      const learningTopicsList = await this.levelsRepository.getLevels();

      return learningTopicsList;
    } catch (error) {
      throw error;
    }
  }
}
