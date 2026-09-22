import { type UserPaymentsRepository } from "../repositories";
import { type UserPaymentView } from "../entities/user-payment-view.entity";

export class UserPaymentsService {
    constructor(private userPaymentsRepository: UserPaymentsRepository) { }

    async getUserPaymentsHistory(search?: string): Promise<UserPaymentView[] | null> {
        try {
            return await this.userPaymentsRepository.getUserPaymentsHistory(search);
        } catch (error) {
            throw error;
        }
    }
}
