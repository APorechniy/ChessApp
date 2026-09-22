import { type LearningTopic } from "../entities/learning-topic.entity";
import { type LearningTopicView } from "../entities/learning-topic-view.entity";
import type { LearningTopicsRepository } from "../repositories";
import { v4 as uuidv4 } from "uuid";

export class LearningTopicService {
  constructor(private learningTopicRepository: LearningTopicsRepository) { }

  async getLearningTopics(
    levelId?: string,
  ): Promise<LearningTopicView[] | null> {
    try {
      const learningTopicsList = levelId
        ? await this.learningTopicRepository.getLearningTopicsByLevelId(levelId)
        : await this.learningTopicRepository.getLearningTopics();

      return learningTopicsList;
    } catch (error) {
      throw error;
    }
  }

  async createLearningTopic(
    learningTopicWithoutId: Omit<LearningTopicView, "id">,
  ): Promise<boolean> {
    const learningTopic: LearningTopic = {
      id: uuidv4(),
      name: learningTopicWithoutId.name,
      description: learningTopicWithoutId.description,
      levelId: learningTopicWithoutId.level.id,
    };

    return await this.learningTopicRepository.createLearningTopic(learningTopic);
  }

  async updateLearningTopic(
    learningTopic: LearningTopicView,
  ): Promise<boolean> {
    const learningTopicModel: LearningTopic = {
      id: learningTopic.id,
      name: learningTopic.name,
      description: learningTopic.description,
      levelId: learningTopic.level.id,
    };
    return Boolean(await this.learningTopicRepository.updateLearningTopic(learningTopicModel));
  }

  async removeLearningTopic(learningTopicId: string): Promise<boolean> {
    return Boolean(await this.learningTopicRepository.removeLearningTopic(learningTopicId));
  }
}
