import { type TaskWithoutId } from "../types";
import { api } from "../../../network/instance";

export type CreateTaskParams = {
    task: TaskWithoutId,
}

type Response = {
    isCreatedTask: boolean;
};

type CreateTask = ({ task }: CreateTaskParams) => Promise<Response>;

const createTask: CreateTask = async ({ task }) => {
    const response = await api.post(`/tasks/`, {
        task: task
    });

    return response.data;
};

export default createTask;
