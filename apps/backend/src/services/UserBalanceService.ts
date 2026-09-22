import { type UserBalance } from "../entities/user-balance.entity";
import { type UserBalanceRepository } from "../repositories";

export class UserBalanceService {
  constructor(private userBalanceRepository: UserBalanceRepository) { }

  async getUserBalance(userId: string): Promise<UserBalance> {
    try {
      const userBalance = await this.userBalanceRepository.getUserBalance(userId);
      if (!userBalance) {
        throw new Error("Cannot find user's balance")
      }
      return userBalance
    } catch (error) {
      throw error;
    }
  }
}
