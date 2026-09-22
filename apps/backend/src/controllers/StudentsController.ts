import { Request, Response, NextFunction, Application } from "express";
import { type StudentView } from "../entities/student-view.entity";
import type { StudentsService } from "../services";
import { authCheck } from "../interceptors/auth-check";

type CreateStudentBody = {
  student: Omit<StudentView, "id">;
};

type UpdateStudentBody = {
  student: StudentView;
};

type RemoveStudentQuery = {
  studentId: string;
};

export class StudentsController {
  constructor(
    private studentsService: StudentsService,
    private logger: Console = console,
  ) { }
  async getStudents(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const studentsList = await this.studentsService.getStudents();

      res.status(200).send({
        studentsList: studentsList,
      });

      return;
    } catch (error) {
      this.logger.error(error);
      next(error);
    }
  }

  async getStudentsStatistic(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const studentStatistic = await this.studentsService.getStatistic(id);

      res.status(200).send({
        studentStatistic: studentStatistic,
      });

      return;
    } catch (error) {
      this.logger.error(error);
      next(error);
    }
  }

  async createStudent(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { student } = req.body as CreateStudentBody;

      if (
        !student ||
        !student.firstName ||
        !student.lastName ||
        !student.level.id
      ) {
        throw new Error("Invalid student");
      }

      const isCreateStudent =
        await this.studentsService.createStudent(student);

      res.status(200).send({
        created: isCreateStudent,
      });

      return;
    } catch (error: any) {
      this.logger.error(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }

  async updateStudent(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { student } = req.body as UpdateStudentBody;

      if (
        !student ||
        !student.firstName ||
        !student.lastName ||
        !student.level.id
      ) {
        throw new Error("Invalid student");
      }

      const isUpdatedStudent =
        await this.studentsService.updateStudent(student);

      res.status(200).send({
        isUpdatedStudent: isUpdatedStudent,
      });

      return;
    } catch (error: any) {
      this.logger.error(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }

  async removeStudent(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { studentId } = req.query as RemoveStudentQuery;

      if (!studentId) {
        throw new Error("StudentID not provided");
      }

      const isRemoveStudent =
        await this.studentsService.removeStudent(studentId);

      res.status(200).send({
        isRemoveStudent: isRemoveStudent,
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
    app.get("/students", authCheck, (req, res, next) =>
      this.getStudents(req, res, next),
    );
    app.get("/students/statistic/:id", authCheck, (req, res, next) =>
      this.getStudentsStatistic(req, res, next),
    );
    app.post("/students/create", authCheck, (req, res, next) =>
      this.createStudent(req, res, next),
    );
    app.put("/students/", authCheck, (req, res, next) =>
      this.updateStudent(req, res, next),
    );
    app.delete("/students/", authCheck, (req, res, next) =>
      this.removeStudent(req, res, next),
    );
  }
}
