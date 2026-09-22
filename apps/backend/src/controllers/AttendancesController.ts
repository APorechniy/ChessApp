import { Request, Response, NextFunction, Application } from "express";
import { AttendancesService } from "../services/AttendancesService";
import { type AttendanceView } from "../entities/attendance-view.entity";
import { authCheck } from "../interceptors/auth-check";
import type { JwtPayload } from "jsonwebtoken";
import { decodeJwt } from "../utils/decode-jwt";
import { type StudentsAttendedView } from "../entities/students-attended-view.entity";

type Query = {
  date: string;
};

type UnclosedQuery = {
  coachId?: string
}

type RemoveAttendanceQuery = {
  attendanceId: string
}

export class AttendancesController {
  constructor(
    private attendancesService: AttendancesService,
    private logger: Console = console,
  ) { }

  async getAttendancesList(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { date } = req.query as Query;

      const attendancesList =
        await this.attendancesService.getAttendancesList(date);

      res.status(200).send({
        attendancesList: attendancesList,
      });

      return;
    } catch (error: any) {
      this.logger.error(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }

  async getUnclosedAttendances(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { coachId } = req.query as UnclosedQuery;
      const localDatetime = req.headers['local-datetime'] as string || new Date().toISOString();

      const unclosedAttendancesList =
        await this.attendancesService.getUnclosedAttendances(localDatetime, coachId);

      res.status(200).send({
        unclosedAttendancesList: unclosedAttendancesList,
      });

      return;
    } catch (error: any) {
      this.logger.error(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }

  async getAttendancesListForStudent(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const cookies = req.cookies;
      const jwtToken = cookies["jwt-token"];

      if (!jwtToken) {
        throw new Error("Access denied");
      }

      const decodedToken = decodeJwt(jwtToken) as JwtPayload;

      if (!decodedToken.id) {
        throw new Error("Access denied");
      }

      const { date } = req.query as Query;

      const attendancesList =
        await this.attendancesService.getAttendancesListForStudent(date, decodedToken.id);

      res.status(200).send({
        attendancesList: attendancesList,
      });

      return;
    } catch (error: any) {
      this.logger.error(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }

  async getNextAttendance(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const cookies = req.cookies;
      const jwtToken = cookies["jwt-token"];

      if (!jwtToken) {
        throw new Error("Access denied");
      }

      const decodedToken = decodeJwt(jwtToken) as JwtPayload;

      if (!decodedToken.id) {
        throw new Error("Access denied");
      }

      const nextAttendance =
        await this.attendancesService.getNextAttendance(decodedToken.id);

      res.status(200).send({
        nextAttendance: nextAttendance,
      });

      return;
    } catch (error: any) {
      this.logger.error(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }

  async createAttendance(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { attendance } = req.body as {
        attendance: Omit<AttendanceView, "id">;
      };

      if (!attendance || !attendance.learningTopic) {
        throw new Error("Invalid attendance");
      }

      const isCreateAttendance = await this.attendancesService.createAttendance(
        attendance,
      );

      if (!isCreateAttendance) {
        throw new Error();
      }

      res.status(200).send({
        created: isCreateAttendance,
      });

      return;
    } catch (error: any) {
      this.logger.error(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }

  async createAttendanceByPreset(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { attendance } = req.body as {
        attendance: Omit<AttendanceView, "id">;
      };

      if (!attendance || !attendance.learningTopic) {
        throw new Error("Invalid attendance");
      }

      const isCreateAttendance = await this.attendancesService.createAttendanceByPreset(
        attendance,
      );

      if (!isCreateAttendance) {
        throw new Error();
      }

      res.status(200).send({
        created: isCreateAttendance,
      });

      return;
    } catch (error: any) {
      this.logger.error(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }

  async updateAttendance(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { attendance, studentsAttended } = req.body as {
        attendance: AttendanceView;
        studentsAttended: StudentsAttendedView[];
      };

      if (!attendance || !attendance.learningTopic) {
        throw new Error("Invalid attendance");
      }

      const isUpdateAttendance = await this.attendancesService.updateAttendance(
        attendance,
        studentsAttended,
      );

      res.status(200).send({
        updated: isUpdateAttendance,
      });

      return;
    } catch (error: any) {
      this.logger.error(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }

  async updateWithFreezeAttendance(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { attendance, studentsAttended } = req.body as {
        attendance: AttendanceView;
        studentsAttended: StudentsAttendedView[];
      };

      if (!attendance || !attendance.learningTopic) {
        throw new Error("Invalid attendance");
      }

      const isUpdateAttendance = await this.attendancesService.freezeAttendance(
        attendance,
        studentsAttended,
      );

      res.status(200).send({
        updated: isUpdateAttendance,
      });

      return;
    } catch (error: any) {
      this.logger.error(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }

  async removeAttendance(req: Request, res: Response, next: NextFunction) {
    try {
      const { attendanceId } = req.query as RemoveAttendanceQuery;
      const cookies = req.cookies;
      const jwtToken = cookies["jwt-token"];

      if (!jwtToken) {
        throw new Error("Access denied");
      }

      const decodedToken = decodeJwt(jwtToken) as JwtPayload;

      if (!attendanceId || attendanceId.length <= 0) {
        throw new Error("Incorrect attendance ID");
      }

      if (!decodedToken.id) {
        throw new Error("Access denied");
      }

      const isRemovedAttendance = await this.attendancesService.removeAttendance(
        attendanceId
      );

      res.status(200).send({
        isRemovedAttendance: isRemovedAttendance,
      });


    } catch (error: any) {
      this.logger.error(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }

  setupRoutes(app: Application) {
    app.get("/attendance", authCheck, (req, res, next) =>
      this.getAttendancesList(req, res, next),
    );
    app.get("/attendance/unclosed", authCheck, (req, res, next) =>
      this.getUnclosedAttendances(req, res, next),
    );
    app.get("/attendance/next", authCheck, (req, res, next) =>
      this.getNextAttendance(req, res, next),
    );
    app.get("/attendance/student", authCheck, (req, res, next) =>
      this.getAttendancesListForStudent(req, res, next),
    );
    app.post("/attendance", authCheck, (req, res, next) =>
      this.createAttendance(req, res, next),
    );
    app.post("/attendance/preset", authCheck, (req, res, next) =>
      this.createAttendanceByPreset(req, res, next),
    );
    app.put("/attendance", authCheck, (req, res, next) =>
      this.updateAttendance(req, res, next),
    );
    app.patch("/attendance", authCheck, (req, res, next) =>
      this.updateWithFreezeAttendance(req, res, next),
    );
    app.delete("/attendance", authCheck, (req, res, next) =>
      this.removeAttendance(req, res, next),
    );
  }
}
