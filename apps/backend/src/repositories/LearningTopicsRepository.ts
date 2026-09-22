import { type Repository, type DataSource, Raw } from "typeorm";
import { LearningTopic } from "../entities/learning-topic.entity";
import { LearningTopicView } from "../entities/learning-topic-view.entity";

export class LearningTopicsRepository {
  private tableRepo: Repository<LearningTopic>;
  private viewRepo: Repository<LearningTopicView>;

  constructor(dataSource: DataSource) {
    this.tableRepo = dataSource.getRepository(LearningTopic);
    this.viewRepo = dataSource.getRepository(LearningTopicView);
  }

  async getLearningTopics() {
    const learningTopicsList = await this.viewRepo.find({
      order: {
        name: {
          direction: "ASC"
        }
      }
    })

    return learningTopicsList;
  }

  async getLearningTopicsByLevelId(levelId: string) {
    const learningTopicsList = await this.viewRepo.find({
      where: {
        level: Raw((alias) => `(${alias}->'$.id') = :id`, {
          id: levelId
        })
      },
      order: {
        name: {
          direction: "ASC"
        }
      }
    })

    return learningTopicsList;
  }

  async createLearningTopic(learningTopic: LearningTopic): Promise<boolean> {
    const createdLearningTopic = this.tableRepo.create(learningTopic);

    return Boolean(await this.tableRepo.save(createdLearningTopic));
  }

  async updateLearningTopic(learningTopic: LearningTopic) {
    return await this.tableRepo.update({ id: learningTopic.id }, learningTopic);
  }

  async removeLearningTopic(learningTopicId: string) {
    return await this.tableRepo.delete({ id: learningTopicId });
  }
}
