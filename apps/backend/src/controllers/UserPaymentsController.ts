import type { Request, Response, NextFunction, Application } from "express";
import type { UserPaymentsService } from "../services";
import { authCheck } from "../interceptors/auth-check";
import { isValidSearchString } from "../utils/is-valid-search-string";

type GetUserPaymentsHistoryQuery = {
    search?: string
}

export class UserPaymentsController {
    constructor(
        private userPaymentsService: UserPaymentsService,
        private logger: Console = console,
    ) { }

    async getUserPaymentsHistory(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const { search } = req.query as GetUserPaymentsHistoryQuery;

            if (search && !isValidSearchString(search)) {
                throw new Error()
            }

            const userPaymentsHistory = await this.userPaymentsService.getUserPaymentsHistory(search);

            res.status(200).send({
                paymentsHistory: userPaymentsHistory
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
        app.get("/user-payments/", authCheck, (req, res, next) =>
            this.getUserPaymentsHistory(req, res, next),
        );
    }
}
