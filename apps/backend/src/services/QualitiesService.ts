import { QualityView } from "../entities/quality-view.entity";
import type { QualitiesRepository } from "../repositories";

export class QualitiesService {
  constructor(private qualitiesRepository: QualitiesRepository) { }

  async getQualityById(qualityId: string): Promise<QualityView | null> {
    try {
      const quality = await this.qualitiesRepository.getQualityById(qualityId);

      return quality;
    } catch (error) {
      throw error;
    }
  }

  async getQualitiesListByLabelFor(
    labelFor: string,
  ): Promise<QualityView[] | null> {
    try {
      const quality =
        await this.qualitiesRepository.getQualitiesListByLabelFor(labelFor);

      return quality;
    } catch (error) {
      throw error;
    }
  }
}
