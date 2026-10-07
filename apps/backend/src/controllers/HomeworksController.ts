import type { Request, Response, NextFunction, Application } from "express";
import type { HomeworksService } from "@/services";
import { authCheck } from "../interceptors/auth-check";
import { type StudentsAttendedView, type HomeworkView } from "@/entities";

type FreezeHomeworkBody = {
    homework: HomeworkView,
    studentsAttended: StudentsAttendedView[]
}

type DeleteHomeworkQuery = {
    homeworkId: string
}

type UpdateHomeworkBody = {
    homework: HomeworkView
}

type GetHomeworkByAttendanceIdQuery = {
    attendanceId: string
}

type CreateHomeworkBody = {
    homework: Omit<HomeworkView, "id">;
};

export class HomeworksController {
    constructor(
        private homeworksService: HomeworksService,
        private logger: Console = console,
    ) { }

    async getHomeworkByAttendanceId(req: Request, res: Response, next: NextFunction) {
        try {
            const { attendanceId } = req.params as GetHomeworkByAttendanceIdQuery;

            const homework = await this.homeworksService.getHomeworkByAttendanceId(
                attendanceId
            );

            if (homework) {
                res.status(200).send({
                    homework: homework,
                });
            } else {
                res.status(404).send({
                    homework: null,
                });
            }


        } catch (error: any) {
            this.logger.error(error);
            res.status(500).send({
                error: error?.message,
            });
        }
    }

    async createHomework(req: Request, res: Response, next: NextFunction) {
        try {
            const { homework } = req.body as CreateHomeworkBody;

            if (
                !homework ||
                !homework.attendanceId ||
                !homework.tasks?.length
            ) {
                throw new Error("Invalid homework");
            }

            const isCreatedHomework =
                await this.homeworksService.createHomework(homework);

            if (!isCreatedHomework) {
                throw new Error("Can not create homework");
            }

            res.status(200).send({
                isCreatedHomework: isCreatedHomework,
            });

            return;
        } catch (error: any) {
            this.logger.error(error);
            res.status(500).send({
                error: error?.message,
            });
        }
    }

    async updateHomework(req: Request, res: Response, next: NextFunction) {
        try {
            const { homework } = req.body as UpdateHomeworkBody;

            if (
                !homework ||
                !homework.id ||
                !homework.attendanceId ||
                !homework.tasks?.length
            ) {
                throw new Error("Invalid homework");
            }

            const isUpdatedHomework =
                await this.homeworksService.updateHomework(homework);

            if (!isUpdatedHomework) {
                throw new Error("Can not update homework");
            }

            res.status(200).send({
                isUpdatedHomework: isUpdatedHomework,
            });

            return;
        } catch (error: any) {
            this.logger.error(error);
            res.status(500).send({
                error: error?.message,
            });
        }
    }

    async freezeHomework(req: Request, res: Response, next: NextFunction) {
        try {
            const { homework, studentsAttended } = req.body as FreezeHomeworkBody;

            if (
                !homework ||
                !homework.attendanceId ||
                !studentsAttended?.length
            ) {
                throw new Error("Invalid homework");
            }

            const isFreezeHomework =
                await this.homeworksService.freezeHomework(homework, studentsAttended);

            if (!isFreezeHomework) {
                throw new Error("Can not freeze homework");
            }

            res.status(200).send({
                isFreezeHomework: isFreezeHomework,
            });

            return;
        } catch (error: any) {
            this.logger.error(error);
            res.status(500).send({
                error: error?.message,
            });
        }
    }

    async deleteHomework(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const { homeworkId } = req.params as DeleteHomeworkQuery;

            if (!homeworkId) {
                throw new Error("HomeworkID not provided");
            }

            const isDeletedHomework =
                await this.homeworksService.deleteHomework(homeworkId);

            res.status(200).send({
                isDeletedHomework: isDeletedHomework,
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
        app.get("/homeworks/attendance/:attendanceId", authCheck, (req, res, next) =>
            this.getHomeworkByAttendanceId(req, res, next)
        )
        app.post("/homeworks/", authCheck, (req, res, next) =>
            this.createHomework(req, res, next),
        )
        app.patch("/homeworks/", authCheck, (req, res, next) =>
            this.updateHomework(req, res, next),
        )
        app.put("/homeworks/freeze", authCheck, (req, res, next) =>
            this.freezeHomework(req, res, next),
        )
        app.delete("/homeworks/:homeworkId", authCheck, (req, res, next) =>
            this.deleteHomework(req, res, next),
        )
    }
}
