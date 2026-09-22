import { QualitiesRepository } from "../../src/repositories";
import { TestDataSource } from "../../src/config/test-ormconfig";
import { EntityMockHelper } from "../helpers/entity-mock-helper";
import qualitiesAttendanceList from "../mock/qualities-attendance-list.json"
import qualitiesTasksList from "../mock/qualities-tasks-list.json"
import quality from "../mock/quality.json"
import { QualityView } from "../../src/entities/quality-view.entity";

describe("Quality Repository", () => {
    let qualitiesRepository: QualitiesRepository;
    beforeAll(async () => {
        const dataSource = TestDataSource;
        await TestDataSource.initialize();

        qualitiesRepository = new QualitiesRepository(dataSource);
    })

    test("Get quality by ID", async () => {
        const qualityId = "daa7af83-c49a-4fa9-83a0-360ef0a9b888"
        const mockedQuality = EntityMockHelper.asEntity(QualityView, quality);
        const qualityById = await qualitiesRepository.getQualityById(qualityId)

        expect(qualityById).toStrictEqual(mockedQuality);
    })
    test("Get 'attendance' qualities", async () => {
        const mockedQualities = EntityMockHelper.asEntityArray(QualityView, qualitiesAttendanceList);
        const qualities = await qualitiesRepository.getQualitiesListByLabelFor("attendance")

        expect(qualities).toStrictEqual(mockedQualities);
    })

    test("Get 'tasks' qualities", async () => {
        const mockedQualities = EntityMockHelper.asEntityArray(QualityView, qualitiesTasksList);
        const qualities = await qualitiesRepository.getQualitiesListByLabelFor("tasks")

        expect(qualities).toStrictEqual(mockedQualities);
    })

    // Если не добавить, Jest не закроется автоматически, т.к. пул будет висеть
    afterAll(done => {
        TestDataSource.destroy()
        done()
    })
})