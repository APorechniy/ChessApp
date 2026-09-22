import type { AuthRepository, CoachesRepository } from "../repositories";
import type { Coach } from "../entities/coach.entity";
import type { CoachView } from "../entities/coach-view.entity";
import { v4 as uuidv4 } from 'uuid'

export class CoachesService {
    constructor(
        private authRepository: AuthRepository,
        private coachesRepository: CoachesRepository,
    ) { }
    async getCoachById(coachId: string): Promise<CoachView> {
        return this.coachesRepository.getCoachById(coachId);
    }

    async createCoach(coach: Omit<Coach, "id">): Promise<boolean> {
        const fullCoach: Coach = {
            id: uuidv4(),
            ...coach,
        };
        const isCreateUser =
            await this.authRepository.createNewCoachUser(fullCoach);

        return (
            (isCreateUser && Boolean(await this.coachesRepository.createCoach(fullCoach))) || false
        );
    }

    async updateCoach(coach: Coach): Promise<boolean> {
        return Boolean(await this.coachesRepository.updateCoach(coach));
    }

    async removeCoach(coachId: string): Promise<boolean> {
        return Boolean(await this.coachesRepository.removeCoach(coachId));
    }
}
