import type { AuthRepository, StudentsRepository, UserBalanceRepository } from "@/repositories";
import { type Student } from "@/entities/student.entity";
import { type StudentView } from "@/entities/student-view.entity";
import { type StudentStatistic } from "@/entities/student-statistic-view.entity";
import { v4 as uuidv4 } from "uuid";

export class StudentsService {
  constructor(
    private authRepository: AuthRepository,
    private studentsRepository: StudentsRepository,
    private userBalanceRepository: UserBalanceRepository,
  ) { }

  async getStudents(): Promise<StudentView[] | null> {
    try {
      const studentsList = await this.studentsRepository.getStudents();

      return studentsList;
    } catch (error) {
      throw error;
    }
  }

  async getStatistic(studentId: string): Promise<StudentStatistic | null> {
    try {
      const studentsList = await this.studentsRepository.getStatistic(studentId);

      return studentsList || null;
    } catch (error) {
      throw error;
    }
  }

  async createStudent(student: Omit<StudentView, "id">): Promise<boolean> {
    const fullStudent: Student = {
      id: uuidv4(),
      firstName: student.firstName,
      lastName: student.lastName,
      birthDate: student.birthDate,
      levelId: student.level.id,
      phone: student.phone,
      email: student.email,
      joinDate: student.joinDate,
      notes: student.notes,
      paidLessons: student.paidLessons,
      fshrId: student.fshrId,
      fideId: student.fideId,
      isExcluded: false,
    };

    const isCreateUser =
      await this.authRepository.createNewStudentUser(fullStudent);

    const isCreateUserBalance = await this.userBalanceRepository.createUserBalance(fullStudent.id);
    const isCreateStudent = await this.studentsRepository.createStudent(fullStudent);

    return (
      (isCreateUser && isCreateUserBalance && isCreateStudent) || false
    );
  }

  async updateStudent(student: StudentView): Promise<boolean> {
    const transformedStudent: Student = {
      id: student.id,
      firstName: student.firstName,
      lastName: student.lastName,
      birthDate: student.birthDate,
      levelId: student.level.id,
      phone: student.phone,
      email: student.email,
      joinDate: student.joinDate,
      notes: student.notes,
      paidLessons: student.paidLessons,
      fshrId: student.fshrId,
      fideId: student.fideId,
      isExcluded: false,
    };

    return await this.studentsRepository.updateStudent(transformedStudent);
  }

  async removeStudent(studentId: string): Promise<boolean> {
    return await this.studentsRepository.removeStudent(studentId);
  }
}
