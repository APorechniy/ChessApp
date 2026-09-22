import type { Request, Response, NextFunction, Application } from "express";
import { authCheck } from "../interceptors/auth-check";
import type { StudentsAttendedService } from "../services";

type GetStudentsAttendedQuery = {
    attendanceId: string
}

export class StudentsAttendedController {
    constructor(
        private studentsAttendedService: StudentsAttendedService,
        private logger: Console = console,
    ) { }

    async getStudentsAttended(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const { attendanceId } = req.query as GetStudentsAttendedQuery;

            if (!attendanceId) {
                throw new Error("Incorrect attendance ID")
            }

            const studentsAttended = await this.studentsAttendedService.getStudentsAttendedByAttendanceId(attendanceId);

            res.status(200).send({
                studentsAttended: studentsAttended,
            });

            return;
        } catch (error: any) {
            this.logger.error(error);
            res.status(500).send({
                error: error?.message,
            });
        }
    }

    setupRoutes(app: Application) {
        app.get("/students-attended/", authCheck, (req, res, next) =>
            this.getStudentsAttended(req, res, next),
        );
    }
}
