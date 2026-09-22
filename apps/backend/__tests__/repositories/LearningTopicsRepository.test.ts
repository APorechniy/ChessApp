import { LearningTopicsRepository } from "../../src/repositories";
import { TestDataSource } from "../../src/config/test-ormconfig";
import { EntityMockHelper } from "../helpers/entity-mock-helper";
import learningTopicsList from "../mock/learning-topics-list.json"
import learningTopicsFilteredList from "../mock/learning-topics-filtered-list.json"
import { LearningTopicView } from "../../src/entities/learning-topic-view.entity";

describe("Learning Topics Repository", () => {
    let learningTopicsRepository: LearningTopicsRepository;
    beforeAll(async () => {
        const dataSource = TestDataSource;
        await TestDataSource.initialize();

        learningTopicsRepository = new LearningTopicsRepository(dataSource);
    })
    test("Get base learning topics", async () => {
        const mockedLearningTopics = EntityMockHelper.asEntityArray(LearningTopicView, learningTopicsList);
        const learningTopics = await learningTopicsRepository.getLearningTopics()

        expect(learningTopics).toStrictEqual(mockedLearningTopics);
    })

    test("Get filtered learning topics", async () => {
        const mockedLearningTopics = EntityMockHelper.asEntityArray(LearningTopicView, learningTopicsFilteredList);

        const levelId = "e1ec6640-d5df-44ea-a297-82bf2c715941"
        const learningTopics = await learningTopicsRepository.getLearningTopicsByLevelId(levelId)

        expect(learningTopics).toStrictEqual(mockedLearningTopics);
    })

    // Если не добавить, Jest не закроется автоматически, т.к. пул будет висеть
    afterAll(done => {
        TestDataSource.destroy()
        done()
    })
})