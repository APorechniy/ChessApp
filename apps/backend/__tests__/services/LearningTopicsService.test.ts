import { LearningTopicsRepository } from "../../src/repositories";
import { LearningTopicService } from "../../src/services";
import { TestDataSource } from "../../src/config/test-ormconfig";
import { EntityMockHelper } from "../helpers/entity-mock-helper";
import learningTopicsList from "../mock/learning-topics-list.json"
import learningTopicsFilteredList from "../mock/learning-topics-filtered-list.json"
import { LearningTopicView } from "../../src/entities/learning-topic-view.entity";

describe("Learning Topics Service", () => {
    let learningTopicService: LearningTopicService;
    beforeAll(async () => {
        const dataSource = TestDataSource;
        await TestDataSource.initialize();

        const learningTopicsRepository = new LearningTopicsRepository(dataSource);
        learningTopicService = new LearningTopicService(learningTopicsRepository);
    })
    test("Get base learning topics", async () => {
        const mockedLearningTopics = EntityMockHelper.asEntityArray(LearningTopicView, learningTopicsList);

        const learningTopics = await learningTopicService.getLearningTopics()

        expect(learningTopics).toStrictEqual(mockedLearningTopics);
    })

    test("Get filtered learning topics", async () => {
        const mockedLearningTopics = EntityMockHelper.asEntityArray(LearningTopicView, learningTopicsFilteredList);

        const levelId = "e1ec6640-d5df-44ea-a297-82bf2c715941"
        const learningTopics = await learningTopicService.getLearningTopics(levelId)

        expect(learningTopics).toStrictEqual(mockedLearningTopics);
    })

    // Если не добавить, Jest не закроется автоматически, т.к. пул будет висеть
    afterAll(done => {
        TestDataSource.destroy()
        done()
    })
})