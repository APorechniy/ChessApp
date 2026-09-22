import { api } from "../../../axios";

export type RemoveTaskParams = {
    taskId: string,
}

type Response = {
    isRemovedTask: boolean;
};

type RemoveTask = ({ taskId }: RemoveTaskParams) => Promise<Response>;

const removeTask: RemoveTask = async ({ taskId }) => {
    const response = await api.delete(`/tasks/?taskId=${taskId}`);

    return response.data;
};

export default removeTask;
