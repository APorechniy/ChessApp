import { type Task } from "../types";
import { api } from "../../../axios";

type Response = {
    task: Task;
};

export type GetTaskByIdListParams = {
    taskId: string
}

type GetTaskByIdList = (params) => Promise<Response>;

const getTaskById: GetTaskByIdList = async ({ taskId }) => {
    const response = await api.get(`/tasks/${taskId}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response.data;
};

export default getTaskById;
