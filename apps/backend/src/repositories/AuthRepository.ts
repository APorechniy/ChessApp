import { type Repository, type DataSource } from "typeorm";
import { User } from "../entities/user.entity";
import { type Student } from "../entities/student.entity";
import { transliteration } from "../utils/transliteration";
import { type Coach } from "../entities/coach.entity";

export class AuthRepository {
  private tableRepo: Repository<User>;

  constructor(dataSourse: DataSource) {
    this.tableRepo = dataSourse.getRepository(User);
  }

  // Авторизовывает пользователя и отдает ID пользователя в случае успеха
  async authUser(name: string, password: string) {
    const user = await this.tableRepo.findOne({
      where: {
        username: name,
        password: password
      }
    })

    if (!user || !user.id) {
      throw new Error("Cannot find user");
    }

    return user?.id
  }

  async createNewStudentUser(student: Student) {
    const userName = transliteration(
      `${student.firstName}_${student.lastName}`,
    );
    const password = "12345678";
    const id = student.id;
    const role = "student";

    const createdUser = this.tableRepo.create({
      id: id,
      username: userName,
      password: password,
      role: role,
    })

    return Boolean(await this.tableRepo.save(createdUser));
  }

  async createNewCoachUser(coach: Coach) {
    const userName = transliteration(
      `${coach.firstName}_${coach.lastName}`,
    );
    const password = "12345678";
    const id = coach.id;
    const role = "coach";

    const createdUser = this.tableRepo.create({
      id: id,
      username: userName,
      password: password,
      role: role,
    })

    return Boolean(await this.tableRepo.save(createdUser));
  }
}
