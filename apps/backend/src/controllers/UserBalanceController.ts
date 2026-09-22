import type { Request, Response, NextFunction, Application } from "express";
import type { UserBalanceService } from "../services";
import { authCheck } from "../interceptors/auth-check";
import { decodeJwt } from "../utils/decode-jwt";
import { JwtPayload } from "jsonwebtoken";

export class UserBalanceController {
  constructor(
    private userBalanceService: UserBalanceService,
    private logger: Console = console,
  ) {}

  async getUserBalance(
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
      const userBalance = await this.userBalanceService.getUserBalance(
        decodedToken.id,
      );

      if (!userBalance && userBalance !== 0) {
        throw new Error("Incorrect user");
      } else {
        res.status(200).send({
          ...userBalance,
        });

        return;
      }
    } catch (error: any) {
      this.logger.error(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }

  setupRoutes(app: Application) {
    app.get("/balance/", authCheck, (req, res, next) =>
      this.getUserBalance(req, res, next),
    );
  }
}
