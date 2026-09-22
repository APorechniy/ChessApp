import type { Request, Response, NextFunction, Application } from "express";
import { authCheck } from "../interceptors/auth-check";
import type { StudentsGroupsService } from "../services";
import { type StudentsGroupView } from "../entities/students-group-view.entity";

type CreateStudentsGroupBody = {
    studentsGroup: Omit<StudentsGroupView, "id">
}

type UpdateStudentsGroupBody = {
    studentsGroup: StudentsGroupView
}

type DeleteStudentsGroupQuery = {
    studentsGroupId: string
}

export class StudentsGroupsController {
    constructor(
        private studentsGroupsService: StudentsGroupsService,
        private logger: Console = console,
    ) { }

    async getStudentsGroups(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const studentsGroups = await this.studentsGroupsService.getStudentsGroups();

            res.status(200).send({
                studentsGroups: studentsGroups,
            });

            return;
        } catch (error: any) {
            this.logger.error(error);
            res.status(500).send({
                error: error?.message,
            });
        }
    }

    async createStudentsGroup(req: Request, res: Response, next: NextFunction) {
        try {
            const { studentsGroup } = req.body as CreateStudentsGroupBody;

            if (!studentsGroup || !studentsGroup.name) {
                throw new Error("Invalid students group");
            }

            const isCreatedStudentsGroup = await this.studentsGroupsService.createStudentsGroup(studentsGroup);

            if (!isCreatedStudentsGroup) {
                throw new Error("Can not create students group");
            }

            res.status(200).send({
                isCreatedStudentsGroup: isCreatedStudentsGroup,
            });

            return;
        } catch (error: any) {
            this.logger.error(error);
            res.status(500).send({
                error: error?.message,
            });
        }
    }

    async updateStudentsGroup(req: Request, res: Response, next: NextFunction) {
        try {
            const { studentsGroup } = req.body as UpdateStudentsGroupBody;
            const localDatetime = req.headers['local-datetime'] as string || new Date().toISOString();

            if (!studentsGroup || !studentsGroup.name || !studentsGroup.id) {
                throw new Error("Invalid students group");
            }

            const isUpdatedStudentsGroup = await this.studentsGroupsService.updateStudentsGroup(studentsGroup, localDatetime);

            if (!isUpdatedStudentsGroup) {
                throw new Error("Can not update students group");
            }

            res.status(200).send({
                isUpdatedStudentsGroup: isUpdatedStudentsGroup,
            });

            return;
        } catch (error: any) {
            this.logger.error(error);
            res.status(500).send({
                error: error?.message,
            });
        }
    }

    async deleteStudentsGroup(req: Request, res: Response, next: NextFunction) {
        try {
            const { studentsGroupId } = req.query as DeleteStudentsGroupQuery;

            if (!studentsGroupId) {
                throw new Error("Invalid students group ID");
            }

            const isDeletedStudentsGroup = await this.studentsGroupsService.deleteStudentsGroup(studentsGroupId);

            if (!isDeletedStudentsGroup) {
                throw new Error("Can not delete students group");
            }

            res.status(200).send({
                isDeletedStudentsGroup: isDeletedStudentsGroup,
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
        app.get("/students-groups/", authCheck, (req, res, next) =>
            this.getStudentsGroups(req, res, next),
        );
        app.post("/students-groups/", authCheck, (req, res, next) =>
            this.createStudentsGroup(req, res, next),
        );
        app.put("/students-groups/", authCheck, (req, res, next) =>
            this.updateStudentsGroup(req, res, next),
        );
        app.delete("/students-groups/", authCheck, (req, res, next) =>
            this.deleteStudentsGroup(req, res, next),
        );
    }
}
