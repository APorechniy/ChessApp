import type { Request, Response, NextFunction, Application } from "express";
import { authCheck } from "../interceptors/auth-check";
import type { QualitiesService } from "../services";

type GetQualityQuery = {
  qualityId: string;
};

type GetQualitiesListQuery = {
  labelFor: string;
};

export class QualitiesController {
  constructor(
    private qualitiesService: QualitiesService,
    private logger: Console = console,
  ) {}

  async getQuality(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { qualityId, labelFor } = req.query as GetQualityQuery &
        GetQualitiesListQuery;

      if (!qualityId && !labelFor) {
        throw new Error("Not provided parameters");
      }

      if (qualityId) {
        const quality = await this.qualitiesService.getQualityById(qualityId);

        res.status(200).send({
          quality: quality,
        });

        return;
      }

      if (labelFor) {
        const qualitiesList =
          await this.qualitiesService.getQualitiesListByLabelFor(labelFor);

        res.status(200).send({
          qualitiesList: qualitiesList,
        });

        return;
      }
    } catch (error: any) {
      this.logger.error(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }

  setupRoutes(app: Application) {
    app.get("/qualities/", authCheck, (req, res, next) =>
      this.getQuality(req, res, next),
    );
  }
}
