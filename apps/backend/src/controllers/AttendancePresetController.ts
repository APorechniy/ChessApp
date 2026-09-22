import { type Request, type Response, type NextFunction, type Application } from "express";
import { authCheck } from "../interceptors/auth-check";
import { type AttendancePresetService } from "@/services";
import { type AttendancePresetView } from "@/entities";

const ATTENDANCE_PRESET_URL = '/attendance-preset'

export class AttendancePresetController {
    constructor(
        private attendancePresetService: AttendancePresetService,
        private logger: Console = console,
    ) { }

    async getAttendancePresetsList(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const attendancePresetsList =
                await this.attendancePresetService.getAttendancePresetsList();

            res.status(200).send({
                attendancePresetsList: attendancePresetsList,
            });

            return;
        } catch (error: any) {
            this.logger.error(error);
            res.status(500).send({
                error: error?.message,
            });
        }
    }

    async createAttendancePreset(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const { attendancePreset } = req.body as {
                attendancePreset: Omit<AttendancePresetView, "id">;
            };

            if (!attendancePreset || !attendancePreset.rrule || !attendancePreset.type) {
                throw new Error("Invalid attendance preset");
            }

            const isCreatedAttendancePreset = await this.attendancePresetService.createAttendancePreset(
                attendancePreset
            );

            if (!isCreatedAttendancePreset) {
                throw new Error();
            }

            res.status(200).send({
                created: isCreatedAttendancePreset,
            });

            return;
        } catch (error: any) {
            this.logger.error(error);
            res.status(500).send({
                error: error?.message,
            });
        }
    }

    async addExcludedDate(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const { attendancePresetId, excludedDate } = req.body as {
                attendancePresetId: string,
                excludedDate: string
            };

            if (!attendancePresetId || !excludedDate) {
                throw new Error("Invalid attendance preset");
            }

            const isUpdated = await this.attendancePresetService.addExcludedDate(
                attendancePresetId,
                excludedDate
            );

            if (!isUpdated) {
                throw new Error();
            }

            res.status(200).send({
                isUpdated: isUpdated,
            });

            return;
        } catch (error: any) {
            this.logger.error(error);
            res.status(500).send({
                error: error?.message,
            });
        }
    }

    async updateAttendancePreset(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const { attendancePreset } = req.body as {
                attendancePreset: AttendancePresetView;
            };

            if (
                !attendancePreset ||
                !attendancePreset.id ||
                !attendancePreset.endDate ||
                !attendancePreset.startTimeLocal ||
                !attendancePreset.endTimeLocal ||
                !attendancePreset.rrule
            ) {
                throw new Error("Invalid attendance preset");
            }

            const isUpdated =
                await this.attendancePresetService.updateAttendancePreset(attendancePreset);

            res.status(200).send({
                isUpdated: isUpdated,
            });

            return;
        } catch (error: any) {
            this.logger.error(error);
            res.status(500).send({
                error: error?.message,
            });
        }
    }

    async removeAttendancePreset(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const { attendancePresetId } = req.query as {
                attendancePresetId: string;
            };

            if (
                !attendancePresetId
            ) {
                throw new Error("Invalid request");
            }

            const isDeleted =
                await this.attendancePresetService.deleteAttendancePreset(attendancePresetId);

            res.status(200).send({
                isDeleted: isDeleted,
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
        app.get(ATTENDANCE_PRESET_URL, authCheck, (req, res, next) =>
            this.getAttendancePresetsList(req, res, next),
        );
        app.post(ATTENDANCE_PRESET_URL, authCheck, (req, res, next) =>
            this.createAttendancePreset(req, res, next),
        );
        app.put(ATTENDANCE_PRESET_URL, authCheck, (req, res, next) =>
            this.updateAttendancePreset(req, res, next)
        )
        app.delete(ATTENDANCE_PRESET_URL, authCheck, (req, res, next) =>
            this.removeAttendancePreset(req, res, next)
        )
        app.patch(`${ATTENDANCE_PRESET_URL}/exclude`, authCheck, (req, res, next) =>
            this.addExcludedDate(req, res, next)
        )
    }
}
