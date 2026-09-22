import { Application, NextFunction, Request, Response } from "express";
import { CoachReportService } from "../services/CoachReportService";
import { authCheck } from "../interceptors/auth-check";

interface CreateCoachReportBody {
  coachId: string;
}

export class CoachReportController {
  constructor(
    private coachReportService: CoachReportService,
    private logger: Console = console,
  ) { }

  async createReport(req: Request, res: Response, next: NextFunction) {
    try {
      const { coachId } = req.body as CreateCoachReportBody;

      if (!coachId) {
        throw new Error("Coach ID not provided");
      }

      const workbook = await this.coachReportService.createReport(coachId);

      if (!workbook) {
        throw new Error("Can not create report");
      }

      res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + `${workbook.worksheets[0].name}.xlsx`,
      );

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      );

      await workbook.xlsx.write(res);
      res.end();

      return;
    } catch (error: any) {
      this.logger.error(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }

  setupRoutes(app: Application) {
    app.post("/coach-reports/", authCheck, (req, res, next) =>
      this.createReport(req, res, next),
    );
  }
}
