import { type Task } from "../types";
import { api } from "../../../network/instance";

type Response = {
    tasksList: Task[];
    status: number;
};

export type GetTasksListParams = {
    learningTopicId?: string
}

type GetTasksList = (params: GetTasksListParams) => Promise<Response>;

const getTasks: GetTasksList = async (params) => {
    const response = await api.get(`/tasks/${params?.learningTopicId ? `?learningTopicId=${params.learningTopicId}` : ""}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response.data;
};

export default getTasks;
