import { type Repository, type DataSource } from "typeorm";
import { Quality } from "../entities/quality.entity";
import { QualityView } from "../entities/quality-view.entity";

export class QualitiesRepository {
  private tableRepo: Repository<Quality>;
  private viewRepo: Repository<QualityView>;

  constructor(dataSource: DataSource) {
    this.tableRepo = dataSource.getRepository(Quality);
    this.viewRepo = dataSource.getRepository(QualityView);
  }

  async getQualityById(qualityId: string) {
    const qualities = await this.viewRepo.find({
      where: {
        id: qualityId
      },
      take: 1,
    })

    return qualities[0];
  }

  async getQualitiesListByLabelFor(labelFor: string) {
    const qualities = await this.viewRepo.find({
      where: {
        labelFor: labelFor
      },
    })

    return qualities;
  }
}
