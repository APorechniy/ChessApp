import { AuthRepository, CoachesRepository, StudentsRepository, UsersRepository } from "@/repositories";
import { TestDataSource } from "@/config/test-ormconfig";
import { CoachesService, UsersService } from "@/services";
import { Coach, CoachView, User } from "@/entities";
import { transliteration } from "@/utils/transliteration";
import { CoachUser } from "@/types/Users";

describe("Create coach", () => {
    let coachesService: CoachesService;
    let usersService: UsersService;

    const coachPreset: Omit<CoachView, "id"> = {
        firstName: "TestCoach",
        lastName: "TestCoach",
        birthDate: "1972-01-01 05:00:00",
        joinDate: "2026-01-01 05:00:00",
    }

    beforeAll(async () => {
        const dataSource = TestDataSource;
        await TestDataSource.initialize();

        const authRepository = new AuthRepository(dataSource);
        const coachesRepository = new CoachesRepository(dataSource);
        const studentsRepository = new StudentsRepository(dataSource);
        const usersRepository = new UsersRepository(dataSource);
        usersService = new UsersService(coachesRepository, studentsRepository, usersRepository);
        coachesService = new CoachesService(authRepository, coachesRepository);
    })
    test("Create coach", async () => {
        // Создаем пользователя и юзера
        let coach: CoachUser | undefined = undefined;
        const isCreatedCoach = await coachesService.createCoach(coachPreset);
        expect(isCreatedCoach).toBeTruthy()

        // Проверяем что тренер создался
        const list = await usersService.getCoachesList();
        coach = list?.find((c) => c.userData.firstName === coachPreset.firstName && c.userData.lastName === coachPreset.lastName)
        expect(coach).toBeTruthy()
        expect(coach?.userData.firstName).toBe(coachPreset.firstName)
        expect(coach?.userData.lastName).toBe(coachPreset.lastName)
        expect(coach?.userData.birthDate).toBe(coachPreset.birthDate)

        // Проверяем что пользователь создался
        const coachUser = await usersService.getUserById(coach?.id as string);
        expect(coachUser).toMatchObject({ id: coach?.id });
    })

    // Если не добавить, Jest не закроется автоматически, т.к. пул будет висеть
    afterAll(done => {
        const coachesRepo = TestDataSource.getRepository(Coach)
        const usersRepo = TestDataSource.getRepository(User)

        usersRepo.delete({
            username: transliteration(`${coachPreset.firstName}_${coachPreset.lastName}`)
        })
            .then(() => {
                coachesRepo.delete({
                    firstName: coachPreset.firstName,
                    lastName: coachPreset.lastName,
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