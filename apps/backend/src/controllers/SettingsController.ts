import type { Request, Response, NextFunction, Application } from "express";
import type { SettingsService } from "../services";
import { authCheck } from "../interceptors/auth-check";
import { type Settings } from "../entities/settings.entity";

type UpdateSettingsBody = {
    settings: Settings;
};

export class SettingsController {
    constructor(
        private settingsService: SettingsService,
        private logger: Console = console,
    ) { }

    async getSettings(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const settings =
                await this.settingsService.getSettings();

            res.status(200).send({
                settings: settings,
            });

            return;
        } catch (error: any) {
            this.logger.error(error);
            res.status(500).send({
                error: error?.message,
            });
        }
    }

    async updateSettings(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const { settings } = req.body as UpdateSettingsBody;

            if (
                !settings ||
                !settings.id ||
                !settings.name
            ) {
                throw new Error("Invalid settings");
            }

            const isUpdatedSettings =
                await this.settingsService.updateSettings(settings);

            res.status(200).send({
                isUpdatedSettings: isUpdatedSettings,
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
        app.get("/settings/", authCheck, (req, res, next) =>
            this.getSettings(req, res, next),
        );
        app.put("/settings/", authCheck, (req, res, next) =>
            this.updateSettings(req, res, next),
        );
    }
}
