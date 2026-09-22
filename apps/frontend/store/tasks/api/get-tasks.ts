import { type Task } from "../types";
import { api } from "../../../axios";

type Response = {
    tasksList: Task[];
    status: number;
};

export type GetTasksListParams = {
    learningTopicId?: string
}

type GetTasksList = (params) => Promise<Response>;

const getTasks: GetTasksList = async (params) => {
    const response = await api.get(`/tasks/${params?.learningTopicId ? `?learningTopicId=${params.learningTopicId}` : ""}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response.data;
};

export default getTasks;
