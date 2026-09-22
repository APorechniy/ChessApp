import type { Request, Response, NextFunction, Application } from "express";
import type { CoachesService, UsersService } from "../services";
import { authCheck } from "../interceptors/auth-check";
import { decodeJwt } from "../utils/decode-jwt";
import { JwtPayload } from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid'
import { type Coach } from "../entities/coach.entity";
import { type CoachUser, type StudentUser } from "../types/Users";

type CreateCoachBody = {
  coach: Omit<Coach, "id">;
};

type UpdateCoachBody = {
  coachUser: CoachUser;
}

type RemoveCoachQuery = {
  coachId: string
}

type UpdateStudentUserBody = {
  studentUser: StudentUser;
}

export class UsersController {
  constructor(
    private coachesService: CoachesService,
    private usersService: UsersService,
    private logger: Console = console,
  ) { }

  async getUser(
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
      const user = await this.usersService.getUserById(decodedToken.id);

      if (!user) {
        throw new Error("Incorrect user");
      } else {
        res.status(200).send({
          user: user,
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

  async getCoachesList(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const coachesList = await this.usersService.getCoachesList();

      if (!coachesList) {
        throw new Error("Coaches not found");
      } else {
        res.status(200).send({
          coachesList: coachesList,
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

  async createCoach(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { coach } = req.body as CreateCoachBody;

      if (
        !coach ||
        !coach.firstName ||
        !coach.lastName ||
        !coach.birthDate ||
        !coach.joinDate
      ) {
        throw new Error("Invalid coach");
      }

      const isCreateCoach =
        await this.coachesService.createCoach(coach);

      res.status(200).send({
        created: isCreateCoach,
      });

      return;
    } catch (error: any) {
      this.logger.error(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }

  async updateStudentData(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { studentUser } = req.body as UpdateStudentUserBody;

      if (
        !studentUser ||
        studentUser.role !== "student" ||
        !studentUser.id
      ) {
        throw new Error("Invalid student data");
      }

      const isUpdatedStudent =
        await this.usersService.updateUserData(studentUser);

      if (isUpdatedStudent.result) {
        res.status(200).send({
          isUpdatedStudent: isUpdatedStudent.result,
        });
      } else {
        res.status(400).send({
          isUpdatedStudent: isUpdatedStudent.result,
          errorMessage: isUpdatedStudent.message,
        });
      }

      return;
    } catch (error: any) {
      this.logger.error(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }

  async updateCoachData(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { coachUser } = req.body as UpdateCoachBody;

      if (
        !coachUser ||
        coachUser.role !== "coach" ||
        !coachUser.id
      ) {
        throw new Error("Invalid coach data");
      }

      const isUpdatedCoach =
        await this.usersService.updateUserData(coachUser);

      if (isUpdatedCoach.result) {
        res.status(200).send({
          isUpdatedCoach: isUpdatedCoach.result,
        });
      } else {
        res.status(400).send({
          isUpdatedCoach: isUpdatedCoach.result,
          errorMessage: isUpdatedCoach.message,
        });
      }

      return;
    } catch (error: any) {
      this.logger.error(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }

  async removeCoach(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { coachId } = req.query as RemoveCoachQuery;

      if (!coachId) {
        throw new Error("CoachID not provided");
      }

      const isRemoveCoach =
        await this.coachesService.removeCoach(coachId);

      res.status(200).send({
        isRemoveCoach: isRemoveCoach,
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
    app.get("/users/", authCheck, (req, res, next) =>
      this.getUser(req, res, next),
    );
    app.get("/users/coaches", authCheck, (req, res, next) =>
      this.getCoachesList(req, res, next),
    );
    app.post("/users/coaches", authCheck, (req, res, next) =>
      this.createCoach(req, res, next),
    );
    app.put("/users/coaches", authCheck, (req, res, next) =>
      this.updateCoachData(req, res, next),
    );
    app.put("/users/students", authCheck, (req, res, next) =>
      this.updateStudentData(req, res, next),
    );
    app.delete("/users/coaches", authCheck, (req, res, next) =>
      this.removeCoach(req, res, next)
    )
  }
}
