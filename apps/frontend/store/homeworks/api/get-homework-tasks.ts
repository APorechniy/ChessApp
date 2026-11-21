import { type HomeworkTask } from "../types";
import { api } from "../../../network/instance";

type Response = {
    homeworkTasks: HomeworkTask[] | null;
};

export type GetHomeworkTasksParams = {
    homeworkId: string
}

type GetHomeworkTasks = ({ homeworkId }: GetHomeworkTasksParams) => Promise<Response>;

const getHomeworkTasks: GetHomeworkTasks = async ({ homeworkId }) => {
    const response = await api.get(`/homeworks/tasks/${homeworkId}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response.data;
};

export default getHomeworkTasks;
