import { LearningTopicsRepository } from "@/repositories";
import { LearningTopicService } from "@/services";
import { TestDataSource } from "@/config/test-ormconfig";
import { LearningTopic, LearningTopicView, LevelView } from "@/entities";

describe("Update and delete learning topic", () => {
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
    test("Update and delete learning topic", async () => {
        // Создаем тему
        const isCreatedLearningTopic = await learningTopicService.createLearningTopic(learningTopicPreset);
        expect(isCreatedLearningTopic).toBeTruthy()

        // Проверяем что она создалась
        const list = await learningTopicService.getLearningTopics();
        expect(list).toContainEqual(expect.objectContaining({ ...learningTopicPreset }));

        // Меняем содержимое
        const learningTopic = list?.find((lt) => lt.name === learningTopicPreset.name)
        expect(learningTopic).toBeTruthy()

        const updatedLearningTopic: LearningTopicView = {
            id: learningTopic?.id as string,
            name: "Updated JEST",
            description: "UPDATED",
            level: learningTopic?.level as LevelView,
        }

        // Проверяем, что обновилось
        const isUpdated = await learningTopicService.updateLearningTopic(updatedLearningTopic);
        expect(isUpdated).toBeTruthy()
        const updatedList = await learningTopicService.getLearningTopics();
        expect(updatedList).toContainEqual(expect.objectContaining({ ...updatedLearningTopic }));

        // Удаляем топик
        const isDeleted = await learningTopicService.removeLearningTopic(updatedLearningTopic.id);
        expect(isDeleted).toBeTruthy()
        const deletedList = await learningTopicService.getLearningTopics();
        expect(deletedList).not.toContainEqual(expect.objectContaining({ ...updatedLearningTopic }));
    })

    // Если не добавить, Jest не закроется автоматически, т.к. пул будет висеть
    afterAll(done => {
        TestDataSource.destroy()
        done();
    })
})