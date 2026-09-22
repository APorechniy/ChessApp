import { LevelsRepository } from "../../src/repositories";
import { LevelsService } from "../../src/services";
import { TestDataSource } from "../../src/config/test-ormconfig";
import { EntityMockHelper } from "../helpers/entity-mock-helper";
import levelsList from "../mock/levels-list.json"
import { LevelView } from "../../src/entities/level-view.entity";

describe("Levels Service", () => {
    let levelsService: LevelsService;
    beforeAll(async () => {
        const dataSource = TestDataSource;
        await TestDataSource.initialize();

        const levelsRepository = new LevelsRepository(dataSource);
        levelsService = new LevelsService(levelsRepository);
    })
    test("Get base levels", async () => {
        const mockedLevels = EntityMockHelper.asEntityArray(LevelView, levelsList)

        const levels = await levelsService.getLevels()

        expect(levels).toStrictEqual(mockedLevels);
    })

    // Если не добавить, Jest не закроется автоматически, т.к. пул будет висеть
    afterAll(done => {
        TestDataSource.destroy()
        done()
    })
})