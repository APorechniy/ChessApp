import { type Student } from "../entities/student.entity";
import { type CoachesRepository, type StudentsRepository, type UsersRepository } from "../repositories";
import { type UserViewResult, type CoachUser, type AdminUser } from "../types/Users";
import { type User } from "../entities/user.entity";

export class UsersService {
  constructor(
    private coachesRepository: CoachesRepository,
    private studentsRepository: StudentsRepository,
    private usersRepository: UsersRepository,
  ) { }

  async getUserById(userId: string): Promise<UserViewResult> {
    try {
      const user = await this.usersRepository.getUserById(userId);

      if (!user) {
        throw new Error("Cannot find user")
      }

      if (user.role === "coach") {
        const coachData = await this.coachesRepository.getCoachById(userId);

        const fullUser: UserViewResult = {
          ...user,
          role: "coach",
          userData: coachData
        }

        return fullUser
      }

      if (user.role === "student") {
        const studentData = await this.studentsRepository.getStudentById(userId);

        const fullUser: UserViewResult = {
          ...user,
          role: "student",
          userData: studentData
        }

        return fullUser
      }

      return user as AdminUser
    } catch (error) {
      throw error;
    }
  }

  // TODO: унести в CoachesService
  async getCoachesList(): Promise<CoachUser[]> {
    try {
      const coaches = await this.usersRepository.getCoachesList();

      const fullCoaches = Promise.all(coaches.map(async (c) => {
        const coachData = await this.coachesRepository.getCoachById(c.id, true);

        const fullUser: CoachUser = {
          ...c,
          role: "coach",
          userData: coachData
        }

        return fullUser
      }))

      return fullCoaches;
    } catch (error) {
      throw error;
    }
  }

  async updateUserData(user: UserViewResult): Promise<{ result: boolean, message: string }> {
    try {
      if (user.role === "coach") {
        const isExistUsername = await this.usersRepository.isUsernameExist(user.username, user.id);

        if (isExistUsername) {
          return {
            result: false,
            message: "Данный логин уже используется"
          }
        }

        const isUpdatedCoach = await this.coachesRepository.updateCoach(user.userData);
        const isUpdatedUserData = await this.usersRepository.updateUser(user);

        return {
          result: isUpdatedCoach && isUpdatedUserData,
          message: "Ошибка при обновлении данных пользователя"
        }
      }

      if (user.role === "student") {
        const isExistUsername = await this.usersRepository.isUsernameExist(user.username, user.id);

        if (isExistUsername) {
          return {
            result: false,
            message: "Данный логин уже используется"
          }
        }

        const transformedStudent: Student = {
          id: user.userData.id,
          firstName: user.userData.firstName,
          lastName: user.userData.lastName,
          birthDate: user.userData.birthDate,
          levelId: user.userData.level.id,
          phone: user.userData.phone,
          email: user.userData.email,
          joinDate: user.userData.joinDate,
          notes: user.userData.notes,
          paidLessons: user.userData.paidLessons,
          fshrId: user.userData.fshrId,
          fideId: user.userData.fideId,
          isExcluded: false,
        };

        const isUpdatedStudentData = await this.studentsRepository.updateStudent(transformedStudent);
        const isUpdatedUserData = await this.usersRepository.updateUser(user);

        return {
          result: isUpdatedStudentData && isUpdatedUserData,
          message: "Ошибка при обновлении данных пользователя"
        }
      }

      return {
        result: false,
        message: "Ошибка при обновлении данных пользователя"
      }
    } catch (error) {
      throw error;
    }
  }
}
