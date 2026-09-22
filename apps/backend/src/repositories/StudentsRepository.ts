import { type Repository, type DataSource } from "typeorm";
import { Student } from "@/entities/student.entity";
import { StudentView } from "@/entities/student-view.entity";
import { StudentStatistic } from "@/entities/student-statistic-view.entity";

export class StudentsRepository {
  private tableRepo: Repository<Student>;
  private viewRepo: Repository<StudentView>;
  private statisticViewRepo: Repository<StudentStatistic>;

  constructor(dataSource: DataSource) {
    this.tableRepo = dataSource.getRepository(Student);
    this.viewRepo = dataSource.getRepository(StudentView);
    this.statisticViewRepo = dataSource.getRepository(StudentStatistic);
  }

  async getStudentById(studentId: string): Promise<StudentView> {
    const [student] = await this.viewRepo.find({
      where: {
        id: studentId,
        isExcluded: false,
      },
      take: 1
    })

    return student;
  }

  async getStatistic(studentId: string): Promise<StudentStatistic | null> {
    const studentStatistic = await this.statisticViewRepo.findOne({
      where: {
        studentId
      }
    })

    return studentStatistic;
  }

  async getStudents() {
    const studentsList = await this.viewRepo.find({
      where: {
        isExcluded: false,
      },
      order: {
        lastName: {
          direction: "ASC"
        }
      }
    })

    return studentsList;
  }

  async createStudent(student: Student) {
    const createdStudent = this.tableRepo.create(student);

    return Boolean(await this.tableRepo.save(createdStudent));
  }

  async updateStudent(student: Student) {
    const isUpdated = Boolean(await this.tableRepo.update({ id: student.id }, student))

    return isUpdated;
  }

  // Студентов не удаляем, а помечаем как "исключенный"
  // Они перестают попадать в любые выборки (students_view исключает их)
  async removeStudent(studentId: string) {
    const isUpdated = Boolean(await this.tableRepo.update({ id: studentId }, { isExcluded: true }))

    return isUpdated;
  }
}
