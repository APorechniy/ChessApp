import type { Request, Response, NextFunction, Application } from "express";
import type { HomeworksService } from "@/services";
import { authCheck } from "../interceptors/auth-check";
import { type StudentsAttendedView, type HomeworkView, type SolutionAnswer, HomeworkSolutionView } from "@/entities";

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

type UpdateHomeworkSolutionBody = {
    homeworkSolution: HomeworkSolutionView
}

type GetHomeworkByAttendanceIdQuery = {
    attendanceId: string
}

type GetHomeworskByStudentIdQuery = {
    studentId: string
}

type GetSolutionsByHomeworkIdQuery = {
    homeworkId: string
}

type GetHomeworkTasksQuery = {
    homeworkId: string
}

type GetSolutionByHomeworkAndStudentIdsQuery = {
    homeworkId: string;
    studentId: string;
}

type CreateHomeworkBody = {
    homework: Omit<HomeworkView, "id">;
};

type CreateSolutionAnswerBody = {
    solutionAnswer: Omit<SolutionAnswer, "id">;
};

export class HomeworksController {
    constructor(
        private homeworksService: HomeworksService,
        private logger: Console = console,
    ) { }

    async getHomeworksList(req: Request, res: Response, next: NextFunction) {
        try {
            const homeworksList = await this.homeworksService.getHomeworksList();

            if (homeworksList) {
                res.status(200).send({
                    homeworksList: homeworksList,
                });
            } else {
                res.status(404).send({
                    homeworksList: null,
                });
            }


        } catch (error: any) {
            this.logger.error(error);
            res.status(500).send({
                error: error?.message,
            });
        }
    }

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

    async getHomeworksByStudentId(req: Request, res: Response, next: NextFunction) {
        try {
            const { studentId } = req.params as GetHomeworskByStudentIdQuery;

            const homeworks = await this.homeworksService.getHomeworkByStudentId(
                studentId
            );

            if (homeworks) {
                res.status(200).send({
                    homeworksList: homeworks,
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

    async getSolutionsByHomeworkId(req: Request, res: Response, next: NextFunction) {
        try {
            const { homeworkId } = req.params as GetSolutionsByHomeworkIdQuery;

            const solutions = await this.homeworksService.getSolutionsListByHomeworkId(
                homeworkId
            );

            if (solutions) {
                res.status(200).send({
                    homeworkSolutionsList: solutions,
                });
            } else {
                res.status(404).send({
                    homeworkSolutionsList: null,
                });
            }


        } catch (error: any) {
            this.logger.error(error);
            res.status(500).send({
                error: error?.message,
            });
        }
    }

    async getHomeworkTasks(req: Request, res: Response, next: NextFunction) {
        try {
            const { homeworkId } = req.params as GetHomeworkTasksQuery;

            const homeworkTasks = await this.homeworksService.getHomeworkTasks(
                homeworkId
            );

            if (homeworkTasks) {
                res.status(200).send({
                    homeworkTasks: homeworkTasks,
                });
            } else {
                res.status(404).send({
                    homeworkSolutionsList: null,
                });
            }


        } catch (error: any) {
            this.logger.error(error);
            res.status(500).send({
                error: error?.message,
            });
        }
    }

    async getSolutionByStudentId(req: Request, res: Response, next: NextFunction) {
        try {
            const { homeworkId, studentId } = req.params as GetSolutionByHomeworkAndStudentIdsQuery;

            const solution = await this.homeworksService.getSolutionByStudentkId(
                homeworkId,
                studentId
            );

            if (solution) {
                res.status(200).send({
                    solution: solution,
                });
            } else {
                res.status(404).send({
                    solution: null,
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

    async createSolutionAnswer(req: Request, res: Response, next: NextFunction) {
        try {
            const { solutionAnswer } = req.body as CreateSolutionAnswerBody;

            if (
                !solutionAnswer ||
                !solutionAnswer.answerText ||
                !solutionAnswer.homeworkTaskId ||
                !solutionAnswer.homeworkSolutionId
            ) {
                throw new Error("Invalid solution answer");
            }

            const isCreatedAnswer =
                await this.homeworksService.addSolutionAnswer(solutionAnswer);

            if (!isCreatedAnswer) {
                throw new Error("Can not create solution answer");
            }

            res.status(200).send({
                isCreatedAnswer: isCreatedAnswer,
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

    async updateHomeworkSolution(req: Request, res: Response, next: NextFunction) {
        try {
            const { homeworkSolution } = req.body as UpdateHomeworkSolutionBody;

            if (
                !homeworkSolution ||
                !homeworkSolution.id ||
                !homeworkSolution.homework ||
                !homeworkSolution.status
            ) {
                throw new Error("Invalid homework solution");
            }

            const isUpdatedHomeworkSolution =
                await this.homeworksService.updateHomeworkSolution(homeworkSolution);

            if (!isUpdatedHomeworkSolution) {
                throw new Error("Can not update homework solution");
            }

            res.status(200).send({
                isUpdatedHomeworkSolution: isUpdatedHomeworkSolution,
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
        app.get("/homeworks/", authCheck, (req, res, next) =>
            this.getHomeworksList(req, res, next),
        )
        app.get("/homeworks/student/:studentId", authCheck, (req, res, next) =>
            this.getHomeworksByStudentId(req, res, next),
        )
        app.get("/homeworks/attendance/:attendanceId", authCheck, (req, res, next) =>
            this.getHomeworkByAttendanceId(req, res, next)
        )
        app.get("/homeworks/solutions/:homeworkId", authCheck, (req, res, next) =>
            this.getSolutionsByHomeworkId(req, res, next)
        )
        app.get("/homeworks/solutions/:homeworkId/:studentId", authCheck, (req, res, next) =>
            this.getSolutionByStudentId(req, res, next)
        )
        app.get("/homeworks/tasks/:homeworkId", authCheck, (req, res, next) =>
            this.getHomeworkTasks(req, res, next)
        )
        app.post("/homeworks/", authCheck, (req, res, next) =>
            this.createHomework(req, res, next),
        )
        app.post("/homeworks/solutions/answer", (req, res, next) =>
            this.createSolutionAnswer(req, res, next),
        )
        app.patch("/homeworks/", authCheck, (req, res, next) =>
            this.updateHomework(req, res, next),
        )
        app.put("/homeworks/solutions", (req, res, next) =>
            this.updateHomeworkSolution(req, res, next),
        )
        app.put("/homeworks/freeze", authCheck, (req, res, next) =>
            this.freezeHomework(req, res, next),
        )
        app.delete("/homeworks/:homeworkId", authCheck, (req, res, next) =>
            this.deleteHomework(req, res, next),
        )
    }
}
