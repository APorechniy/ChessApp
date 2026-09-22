import { type Repository, type DataSource } from "typeorm";
import { UserBalance } from "../entities/user-balance.entity";

export class UserBalanceRepository {
  private tableRepo: Repository<UserBalance>;

  constructor(dataSource: DataSource) {
    this.tableRepo = dataSource.getRepository(UserBalance);
  }

  async getUserBalance(userId: string): Promise<UserBalance | null> {
    const userBalance = await this.tableRepo.findOne({
      where: {
        userId: userId
      }
    })

    if (!userBalance || (Number.isNaN(Number(userBalance.balance))) || userBalance.balance === null) {
      throw new Error('SQL ERROR: Can not get user balance')
    }

    return userBalance;
  }

  async createUserBalance(userId: string): Promise<boolean> {
    const createdUserBalance = this.tableRepo.create({
      userId: userId,
      balance: 0
    })

    return Boolean(await this.tableRepo.save(createdUserBalance));
  }

  async incrementUserBalance(
    userId: string,
    balance: number,
  ): Promise<boolean> {
    const isUpdated = await this.tableRepo.increment({ userId: userId }, "balance", balance);

    return Boolean(isUpdated);
  }

  async decrementUserBalance(
    userId: string,
    balance: number,
  ): Promise<boolean> {
    const isUpdated = await this.tableRepo.decrement({ userId: userId }, "balance", balance);

    return Boolean(isUpdated);
  }
}
