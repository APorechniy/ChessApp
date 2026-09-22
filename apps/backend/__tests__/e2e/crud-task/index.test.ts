import { TasksRepository } from "@/repositories";
import { TestDataSource } from "@/config/test-ormconfig";
import { TasksService } from "@/services";
import { Task, type TaskView } from "@/entities";

describe("CRUD task", () => {
    let tasksService: TasksService;
    let taskId: string;

    const taskPreset: Omit<TaskView, "id"> = {
        "name": "TEST FOR JEST",
        "learningTopic": {
            "id": "fc7529f5-16c0-45fd-bd39-33c1d8fdaa00",
            "name": "Оппозиция",
            "level": {
                "id": "e1ec6640-d5df-44ea-a297-82bf2c715941",
                "name": "Базовый",
                "description": "Самый самый тестовый основной базовый уровень для масеньких",
                "hoursRequired": 20
            },
            "description": "изучаем понятие оппозиции"
        },
        "position": null,
        "quality": {
            "id": "5b0f9065-ad4f-4480-9e80-a6f3fa83fbc3",
            "name": "EASY",
            "label": "Легко",
            "labelFor": "tasks",
            "darkColor": "#a2ff30",
            "lightColor": "#a2ff30"
        }
    }

    beforeAll(async () => {
        const dataSource = TestDataSource;
        await TestDataSource.initialize();

        const tasksRepository = new TasksRepository(dataSource);

        tasksService = new TasksService(
            tasksRepository
        );
    })
    test("CRUD TASK", async () => {
        // Создаем задачу
        const isCreatedTask = await tasksService.createTask(taskPreset);
        expect(isCreatedTask).toBeTruthy()

        // Проверяем что задача создалась
        const list = await tasksService.getTasks();
        expect(list).toContainEqual(expect.objectContaining({ ...taskPreset }));
        taskId = list?.find((sg) => sg.name === taskPreset.name)?.id as string;
        expect(taskId).toBeTruthy()

        // Редактируем задачу
        const updatedTask = {
            id: taskId,
            ...taskPreset,
            "quality": {
                "id": "a7923f71-547b-45aa-b128-19924050e01d",
                "name": "MEDIUM",
                "label": "Средне",
                "labelFor": "tasks",
                "darkColor": "#ffea03",
                "lightColor": "#ffea03"
            }
        }

        const isUpdated = await tasksService.updateTask(updatedTask)
        expect(isUpdated).toBeTruthy()

        // Проверяем что задача обновилась
        const updatedList = await tasksService.getTasks();
        expect(updatedList).toContainEqual(expect.objectContaining({ ...updatedTask }));

        // Удаляем задачу
        const isDeleted = await tasksService.removeTask(taskId)
        expect(isDeleted).toBeTruthy()

        // Проверяем что задача удалилась
        const deletedList = await tasksService.getTasks();
        expect(deletedList).not.toContainEqual(expect.objectContaining({ ...updatedTask }));
    })

    // Если не добавить, Jest не закроется автоматически, т.к. пул будет висеть
    afterAll(done => {
        const taskRepo = TestDataSource.getRepository(Task)

        taskRepo.delete({
            id: taskId
        })
            .then(() => {
                TestDataSource.destroy()
            })
            .finally(() => {
                done();
            })
    })
})