import { type Repository, type DataSource } from "typeorm";
import { Coach } from "../entities/coach.entity";
import { CoachView } from "../entities/coach-view.entity";

export class CoachesRepository {
  private tableRepo: Repository<Coach>;
  private viewRepo: Repository<CoachView>;

  constructor(dataSource: DataSource) {
    this.tableRepo = dataSource.getRepository(Coach);
    this.viewRepo = dataSource.getRepository(CoachView);
  }

  async getCoachById(coachId: string, withFired = false): Promise<CoachView> {
    const whereCondition: any = {
      id: coachId,
    }

    if (!withFired) {
      whereCondition.isFired = false
    }

    const coaches = await this.viewRepo.find({
      where: whereCondition,
      take: 1,
    })

    if (!coaches[0]) {
      throw new Error("Can not find a coach");
    }

    return coaches[0];
  }

  async createCoach(coach: Coach) {
    const createdCoach = this.tableRepo.create(coach);

    return await this.tableRepo.save(createdCoach);
  }

  async updateCoach(coach: Coach) {
    return await this.tableRepo.update({ id: coach.id }, coach);
  }

  // Тренеров не удаляем, а помечаем как "уволенный"
  // Они перестают попадать в любые выборки (coach_view исключает их)
  async removeCoach(coachId: string) {
    return await this.tableRepo.update({ id: coachId }, { isFired: true });
  }
}
