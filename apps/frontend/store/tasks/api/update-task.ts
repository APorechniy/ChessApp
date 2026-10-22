import { type Task } from "../../tasks/types";
import { api } from "../../../network/instance";

export type UpdateTaskParams = {
    task: Task,
}

type Response = {
    isUpdatedTask: boolean;
};

type UpdateTask = ({ task }: UpdateTaskParams) => Promise<Response>;

const updateTask: UpdateTask = async ({ task }) => {
    const response = await api.put(`/tasks/`, {
        task: task
    });

    return response.data;
};

export default updateTask;
