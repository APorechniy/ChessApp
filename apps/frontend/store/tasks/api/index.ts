import getTasks from "./get-tasks"
import createTask from "./create-task"
import updateTask from "./update-task"
import removeTask from "./remove-task"
import getTaskById from "./get-task-by-id"

export const tasksApi = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    removeTask,
}