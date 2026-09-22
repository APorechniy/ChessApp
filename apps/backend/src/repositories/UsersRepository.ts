import { type Repository, type DataSource, Not } from "typeorm";
import { User } from "../entities/user.entity";

export class UsersRepository {
  private tableRepo: Repository<User>;

  constructor(dataSource: DataSource) {
    this.tableRepo = dataSource.getRepository(User);
  }

  async getUserById(userId: string): Promise<Omit<User, "password"> | null> {
    const user = await this.tableRepo.findOne({
      select: {
        id: true,
        username: true,
        password: false,
        role: true
      },
      where: {
        id: userId
      }
    })

    return user;
  }

  async getCoachesList(): Promise<Omit<User, "password">[]> {
    const coachesList = await this.tableRepo.find({
      select: {
        id: true,
        username: true,
        password: false,
        role: true
      },
      where: {
        role: "coach"
      },
      order: {
        username: "ASC"
      }
    })

    return coachesList;
  }

  async isUsernameExist(username: string, currentUserId: string) {
    const isExist = await this.tableRepo.exists({
      where: {
        id: Not(currentUserId),
        username: username
      }
    })

    return isExist
  }

  async updateUser(user: Omit<User, "password">) {
    const isUpdate = await this.tableRepo.update({ id: user.id }, { username: user.username })

    return Boolean(isUpdate);
  }
}
