import express, { type Application } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import {
  AttendanceAdditionalTasksRepository,
  AttendanceMainTasksRepository,
  AttendancePresetRepository,
  AttendancesRepository,
  AuthRepository,
  ChessGamesRepository,
  ChessOpeningsRepository,
  CoachesRepository,
  LearningTopicsRepository,
  LevelsRepository,
  PaymentsRepository,
  QualitiesRepository,
  SettingsRepository,
  StudentsAttendedRepository,
  StudentsBalanceTransactionRepository,
  StudentsGroupsRepository,
  StudentsRepository,
  TasksRepository,
  UserBalanceRepository,
  UserGroupsRepository,
  UserPaymentsRepository,
  UsersRepository,
} from "@/repositories";
import {
  AttendancePresetService,
  AttendancesService,
  AuthService,
  ChessGamesService,
  ChessOpeningsService,
  CoachesService,
  CoachReportService,
  LearningTopicService,
  LevelsService,
  PaymentsService,
  QualitiesService,
  ReportsService,
  SettingsService,
  StudentsAttendedService,
  StudentsGroupsService,
  StudentsService,
  TasksService,
  UserBalanceService,
  UserPaymentsService,
  UsersService,
} from "@/services";
import {
  AttendancePresetController,
  AttendancesController,
  AuthController,
  ChessGamesController,
  ChessOpeningsController,
  CoachReportController,
  LearningTopicsController,
  LevelsController,
  PaymentsController,
  QualitiesController,
  ReportsController,
  SettingsController,
  StudentsAttendedController,
  StudentsController,
  StudentsGroupsController,
  TasksController,
  UserBalanceController,
  UserPaymentsController,
  UsersController,
} from "@/controllers";
import { getEnvConfig } from "./config/get-env-config";
import { AppDataSource } from "./config/ormconfig";
import { type DataSource } from "typeorm";
import "reflect-metadata";

export class App {
  private app: Application;
  private appDataSource: DataSource;
  private attendancesController?: AttendancesController;
  private attendancePresetController?: AttendancePresetController;
  private authController?: AuthController;
  private chessGamesController?: ChessGamesController;
  private chessOpeningsController?: ChessOpeningsController;
  private coachReportController?: CoachReportController;
  private learningTopicsController?: LearningTopicsController;
  private levelsController?: LevelsController;
  private paymentsController?: PaymentsController;
  private qualitiesController?: QualitiesController;
  private reportsController?: ReportsController;
  private settingsController?: SettingsController;
  private studentsAttendedController?: StudentsAttendedController;
  private studentsGroupsController?: StudentsGroupsController;
  private studentsController?: StudentsController;
  private tasksController?: TasksController;
  private userBalanceController?: UserBalanceController;
  private userPaymentsController?: UserPaymentsController;
  private usersController?: UsersController;

  constructor() {
    this.app = express();
    this.appDataSource = AppDataSource;
    this.initSource();
    this.setupCORS();
    this.setupDependencies();
    this.setupMiddleware();
    this.setupRoutes();
  }

  private async initSource() {
    await this.appDataSource.initialize();
  }

  private setupDependencies() {
    // Репозитории
    const attendanceAdditionalTasksRepository = new AttendanceAdditionalTasksRepository(this.appDataSource);
    const attendanceMainTasksRepository = new AttendanceMainTasksRepository(this.appDataSource);
    const attendancesRepository = new AttendancesRepository(this.appDataSource);
    const attendancePresetRepository = new AttendancePresetRepository(this.appDataSource);
    const authRepository = new AuthRepository(this.appDataSource);
    const chessGamesRepository = new ChessGamesRepository(this.appDataSource);
    const chessOpeningsRepository = new ChessOpeningsRepository(this.appDataSource);
    const coachesRepository = new CoachesRepository(this.appDataSource);
    const learningTopicsRepository = new LearningTopicsRepository(this.appDataSource);
    const levelsRepository = new LevelsRepository(this.appDataSource);
    const paymentsRepository = new PaymentsRepository(this.appDataSource);
    const qualitiesRepository = new QualitiesRepository(this.appDataSource);
    // const reportsRepository = new ReportsRepository(this.dbPool);
    const settingsRepository = new SettingsRepository(this.appDataSource);
    const studentsAttendedRepository = new StudentsAttendedRepository(this.appDataSource);
    const studentsBalanceTransactionRepository = new StudentsBalanceTransactionRepository(this.appDataSource);
    const studentsGroupsRepository = new StudentsGroupsRepository(this.appDataSource);
    const studentsRepository = new StudentsRepository(this.appDataSource);
    const tasksRepository = new TasksRepository(this.appDataSource);
    const userBalanceRepository = new UserBalanceRepository(this.appDataSource);
    const userGroupsRepository = new UserGroupsRepository(this.appDataSource);
    const userPaymentsRepository = new UserPaymentsRepository(this.appDataSource);
    const usersRepository = new UsersRepository(this.appDataSource);

    // Сервисы
    const attendancesService = new AttendancesService(
      attendancesRepository,
      attendanceMainTasksRepository,
      attendanceAdditionalTasksRepository,
      attendancePresetRepository,
      settingsRepository,
      studentsAttendedRepository,
      studentsBalanceTransactionRepository,
      studentsGroupsRepository,
      userBalanceRepository,
    );
    const attendancePresetService = new AttendancePresetService(
      attendancePresetRepository,
      attendancesRepository
    );
    const authService = new AuthService(authRepository);
    const chessGamesService = new ChessGamesService(chessGamesRepository);
    const chessOpeningsService = new ChessOpeningsService(chessOpeningsRepository);
    const coachesService = new CoachesService(
      authRepository,
      coachesRepository
    );
    const coachReportService = new CoachReportService(attendancesRepository, coachesRepository)
    const learningTopicsService = new LearningTopicService(learningTopicsRepository);
    const levelsService = new LevelsService(levelsRepository);
    const paymentsService = new PaymentsService(
      paymentsRepository,
      settingsRepository,
      studentsBalanceTransactionRepository,
      studentsRepository,
      userPaymentsRepository,
      userBalanceRepository
    );
    const qualitiesService = new QualitiesService(qualitiesRepository);
    const reportsService = new ReportsService(
      attendancesRepository,
      studentsAttendedRepository,
      studentsRepository
    );
    const settingsService = new SettingsService(settingsRepository);
    const studentsAttendedService = new StudentsAttendedService(studentsAttendedRepository);
    const studentsGroupsService = new StudentsGroupsService(
      attendancesRepository,
      studentsAttendedRepository,
      studentsGroupsRepository,
      userGroupsRepository
    );
    const studentsService = new StudentsService(
      authRepository,
      studentsRepository,
      userBalanceRepository,
    );
    const tasksService = new TasksService(tasksRepository);
    const userBalanceService = new UserBalanceService(userBalanceRepository);
    const userPaymentsService = new UserPaymentsService(userPaymentsRepository);
    const usersService = new UsersService(
      coachesRepository,
      studentsRepository,
      usersRepository
    );

    // Контроллеры
    this.attendancesController = new AttendancesController(attendancesService);
    this.attendancePresetController = new AttendancePresetController(attendancePresetService);
    this.authController = new AuthController(authService);
    this.chessGamesController = new ChessGamesController(chessGamesService);
    this.chessOpeningsController = new ChessOpeningsController(chessOpeningsService);
    this.coachReportController = new CoachReportController(coachReportService);
    this.learningTopicsController = new LearningTopicsController(learningTopicsService);
    this.levelsController = new LevelsController(levelsService);
    this.paymentsController = new PaymentsController(paymentsService);
    this.qualitiesController = new QualitiesController(qualitiesService);
    this.reportsController = new ReportsController(reportsService);
    this.settingsController = new SettingsController(settingsService);
    this.studentsAttendedController = new StudentsAttendedController(studentsAttendedService);
    this.studentsGroupsController = new StudentsGroupsController(studentsGroupsService);
    this.studentsController = new StudentsController(studentsService);
    this.tasksController = new TasksController(tasksService);
    this.userBalanceController = new UserBalanceController(userBalanceService);
    this.userPaymentsController = new UserPaymentsController(userPaymentsService);
    this.usersController = new UsersController(coachesService, usersService);
  }

  private setupCORS() {
    // Не менять без согласования
    this.app.use(
      cors({
        origin: process.env.MODE === "dev" ? "http://localhost:8080" : "https://chess-manager.ru",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: [
          "Authorization",
          "Content-Type",
          "Local-Datetime",
          process.env.MODE === "dev" ? "X-Cypress-Auth" : "",
        ],
        credentials: true,
        exposedHeaders: ["Content-Disposition"],
      }),
    );
  }

  private setupMiddleware() {
    this.app.use(express.json());
    this.app.use(cookieParser());
  }

  private setupRoutes() {
    this.attendancesController?.setupRoutes(this.app);
    this.attendancePresetController?.setupRoutes(this.app);
    this.authController?.setupRoutes(this.app);
    this.chessGamesController?.setupRoutes(this.app);
    this.chessOpeningsController?.setupRoutes(this.app);
    this.coachReportController?.setupRoutes(this.app);
    this.learningTopicsController?.setupRoutes(this.app);
    this.levelsController?.setupRoutes(this.app);
    this.paymentsController?.setupRoutes(this.app);
    this.qualitiesController?.setupRoutes(this.app);
    this.reportsController?.setupRoutes(this.app);
    this.settingsController?.setupRoutes(this.app);
    this.studentsAttendedController?.setupRoutes(this.app);
    this.studentsGroupsController?.setupRoutes(this.app);
    this.studentsController?.setupRoutes(this.app);
    this.tasksController?.setupRoutes(this.app);
    this.userBalanceController?.setupRoutes(this.app);
    this.userPaymentsController?.setupRoutes(this.app);
    this.usersController?.setupRoutes(this.app);

    this.app.get('/healthcheck', (_, res) => res.status(200).send())
  }

  public start(port: number) {
    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }

  public getApp() {
    return this.app;
  }
}
const config = getEnvConfig();

new App().start(config.API_PORT);
