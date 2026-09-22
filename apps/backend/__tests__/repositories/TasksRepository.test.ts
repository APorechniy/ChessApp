import { TasksRepository } from "../../src/repositories";
import { TestDataSource } from "../../src/config/test-ormconfig";
import { EntityMockHelper } from "../helpers/entity-mock-helper";
import tasksList from "../mock/tasks-list.json"
import tasksFilteredList from "../mock/tasks-filtered-list.json"
import { TaskView } from "../../src/entities/task-view.entity";

describe("Tasks Repository", () => {
    let tasksRepository: TasksRepository;
    beforeAll(async () => {
        const dataSource = TestDataSource;
        await TestDataSource.initialize();

        tasksRepository = new TasksRepository(dataSource);
    })

    test("Get base tasks list", async () => {
        const mockedTasks = EntityMockHelper.asEntityArray(TaskView, tasksList)
        const tasks = await tasksRepository.getTasks()

        expect(tasks).toStrictEqual(mockedTasks);
    })

    test("Get filtered tasks list", async () => {
        const mockedTasks = EntityMockHelper.asEntityArray(TaskView, tasksFilteredList)

        const learningTopicId = "ec521191-85bd-4bcc-9b40-623461ff2b26";
        const tasks = await tasksRepository.getTasksByLearningTopicId(learningTopicId);

        expect(tasks).toStrictEqual(mockedTasks);
    })

    // Если не добавить, Jest не закроется автоматически, т.к. пул будет висеть
    afterAll(done => {
        TestDataSource.destroy()
        done()
    })
})