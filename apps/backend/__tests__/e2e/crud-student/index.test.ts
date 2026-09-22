import { AuthRepository, CoachesRepository, StudentsRepository, UserBalanceRepository, UsersRepository } from "@/repositories";
import { TestDataSource } from "@/config/test-ormconfig";
import { StudentView } from "@/entities/student-view.entity";
import { StudentsService, UserBalanceService, UsersService } from "@/services";
import { Student, User } from "@/entities";
import { transliteration } from "@/utils/transliteration";

describe("Create student", () => {
    let studentsService: StudentsService;
    let usersService: UsersService;
    let userBalanceService: UserBalanceService;

    const studentPreset: Omit<StudentView, "id"> = {
        firstName: "TestStudent",
        lastName: "TestStudent",
        level: {
            "description": "Категория учеников, которые занимаются уже год",
            "hoursRequired": 100,
            "id": "b7ce384f-014b-4ac1-a2b8-33f1029bc6d2",
            "name": "1 год подготовки"
        },
        isExcluded: false,
    }

    beforeAll(async () => {
        const dataSource = TestDataSource;
        await TestDataSource.initialize();

        const authRepository = new AuthRepository(dataSource);
        const coachesRepository = new CoachesRepository(dataSource);
        const studentsRepository = new StudentsRepository(dataSource);
        const userBalanceRepository = new UserBalanceRepository(dataSource);
        const usersRepository = new UsersRepository(dataSource);
        usersService = new UsersService(coachesRepository, studentsRepository, usersRepository);
        userBalanceService = new UserBalanceService(userBalanceRepository);
        studentsService = new StudentsService(authRepository, studentsRepository, userBalanceRepository);
    })
    test("Create student", async () => {
        // Создаем пользователя, юзера и баланс
        let studentId: string | undefined = "";
        const isCreatedStudent = await studentsService.createStudent(studentPreset);
        expect(isCreatedStudent).toBeTruthy()
        // Проверяем что студент создался
        const list = await studentsService.getStudents();
        expect(list).toContainEqual(expect.objectContaining({ ...studentPreset }));
        studentId = list?.find((s) => s.firstName === studentPreset.firstName && s.lastName === studentPreset.lastName)?.id as string
        expect(studentId).toBeTruthy()

        // Проверяем что пользователь создался
        const studentUser = await usersService.getUserById(studentId as string);
        expect(studentUser).toMatchObject({ id: studentId });

        // Проверяем что баланс создался
        const balance = await userBalanceService.getUserBalance(studentId as string);
        expect(balance).toMatchObject({ userId: studentId, balance: 0 });

        // Изменяем студента
        const updatedStudent: StudentView = {
            id: studentId,
            ...studentPreset,
            firstName: "UPDATED",
            lastName: "UPDATED",
            fshrId: 100000,
            fideId: 100000,
            notes: "TEST"
        }
        const isUpdated = await studentsService.updateStudent(updatedStudent);
        expect(isUpdated).toBeTruthy()

        // Проверяем что студент изменился
        const updatedList = await studentsService.getStudents();
        expect(updatedList).toContainEqual(expect.objectContaining({ ...updatedStudent }));

        // Удаляем студента
        const isDeleted = await studentsService.removeStudent(studentId)
        expect(isDeleted).toBeTruthy()

        // Проверяем что студент удалился
        const deletedList = await studentsService.getStudents();
        expect(deletedList).not.toContainEqual(expect.objectContaining({ ...updatedStudent }));
    })

    // Если не добавить, Jest не закроется автоматически, т.к. пул будет висеть
    afterAll(done => {
        const studentsRepo = TestDataSource.getRepository(Student)
        const usersRepo = TestDataSource.getRepository(User)

        usersRepo.delete({
            username: transliteration(`${studentPreset.firstName}_${studentPreset.lastName}`)
        })
            .then(() => {
                studentsRepo.delete({
                    firstName: studentPreset.firstName,
                    lastName: studentPreset.lastName,
                })
                    .then(() => {
                        TestDataSource.destroy()
                    })
                    .finally(() => {
                        done();
                    })
            })
    })
})