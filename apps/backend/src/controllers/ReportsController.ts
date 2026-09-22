import { Request, Response, NextFunction, Application } from "express";
import { ReportsService } from "../services";
import { authCheck } from "../interceptors/auth-check";

type GetReportsQuery = {
  studentId: string;
};

type CreateReportBody = {
  studentId: string;
};

export class ReportsController {
  constructor(
    private reportsService: ReportsService,
    private logger: Console = console,
  ) { }

  // async getReportsByStudentId(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction,
  // ): Promise<void> {
  //   try {
  //     const { studentId } = req.query as GetReportsQuery;

  //     if (!studentId) {
  //       throw new Error("Student ID not provided");
  //     }

  //     const reportsList =
  //       await this.reportsService.getReportsByStudentId(studentId);

  //     res.status(200).send({
  //       reportsList: reportsList,
  //     });

  //     return;
  //   } catch (error: any) {
  //     this.logger.error(error);
  //     res.status(500).send({
  //       error: error?.message,
  //     });
  //   }
  // }

  async createReport(req: Request, res: Response, next: NextFunction) {
    try {
      const { studentId } = req.body as CreateReportBody;

      if (!studentId) {
        throw new Error("Student ID not provided");
      }

      const workbook = await this.reportsService.createReport(studentId);

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
    // app.get("/reports/", authCheck, (req, res, next) =>
    //   this.getReportsByStudentId(req, res, next),
    // );
    app.post("/reports/", authCheck, (req, res, next) =>
      this.createReport(req, res, next),
    );
  }
}
