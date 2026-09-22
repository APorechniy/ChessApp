import { CoachesRepository } from "@/repositories";
import { TestDataSource } from "../../src/config/test-ormconfig";
import { EntityMockHelper } from "../helpers/entity-mock-helper";
import coach from "../mock/coach.json"
import { CoachView } from "@/entities";

describe("Coaches Repository", () => {
    let coachesRepository: CoachesRepository;
    beforeAll(async () => {
        const dataSource = TestDataSource;
        await TestDataSource.initialize();

        coachesRepository = new CoachesRepository(dataSource);
    })
    test("Get coach by ID", async () => {
        const mockedCoach = EntityMockHelper.asEntity(CoachView, coach);

        const loadedCoach = await coachesRepository.getCoachById(mockedCoach.id)

        expect(loadedCoach).toStrictEqual(mockedCoach);
    })

    test("Cannot get coach by ID", async () => {
        const mockedCoach = EntityMockHelper.asEntity(CoachView, coach);

        const fn = coachesRepository.getCoachById.bind(coachesRepository, "anyid")

        await expect(fn).rejects.toThrow("Can not find a coach");
    })

    // Если не добавить, Jest не закроется автоматически, т.к. пул будет висеть
    afterAll(done => {
        TestDataSource.destroy()
        done()
    })
})