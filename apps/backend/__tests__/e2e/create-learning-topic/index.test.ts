import { LearningTopicsRepository } from "@/repositories";
import { LearningTopicService } from "@/services";
import { TestDataSource } from "@/config/test-ormconfig";
import { LearningTopic, LearningTopicView } from "@/entities";

describe("Create learning topic", () => {
    let learningTopicService: LearningTopicService;
    const learningTopicPreset: Omit<LearningTopicView, "id"> = {
        name: "TEST JEST",
        description: "JEST TEST",
        level: {
            "description": "Категория учеников, которые занимаются уже год",
            "hoursRequired": 100,
            "id": "b7ce384f-014b-4ac1-a2b8-33f1029bc6d2",
            "name": "1 год подготовки"
        },
    }

    beforeAll(async () => {
        const dataSource = TestDataSource;
        await TestDataSource.initialize();

        const learningTopicRepository = new LearningTopicsRepository(dataSource);
        learningTopicService = new LearningTopicService(learningTopicRepository);
    })
    test("Create learning topic", async () => {
        // Создаем тему
        const isCreatedLearningTopic = await learningTopicService.createLearningTopic(learningTopicPreset);
        expect(isCreatedLearningTopic).toBeTruthy()

        // Проверяем что она создалась
        const list = await learningTopicService.getLearningTopics();
        expect(list).toContainEqual(expect.objectContaining({ ...learningTopicPreset }));
    })

    // Если не добавить, Jest не закроется автоматически, т.к. пул будет висеть
    afterAll(done => {
        const repo = TestDataSource.getRepository(LearningTopic)
        repo.delete({
            name: learningTopicPreset.name
        }).then(() => {
            TestDataSource.destroy()
        }).finally(() => {
            done();
        })
    })
})