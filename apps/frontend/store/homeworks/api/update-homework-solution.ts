import { type HomeworkSolution } from "../types";
import { api } from "../../../axios";

export type UpdateHomeworkSolutionParams = {
    homeworkSolution: HomeworkSolution,
}

type Response = {
    isUpdatedHomeworkSolution: boolean;
};

type UpdateHomeworkSolution = ({ homeworkSolution }: UpdateHomeworkSolutionParams) => Promise<Response>;

const updateHomeworkSolution: UpdateHomeworkSolution = async ({ homeworkSolution }) => {
    const response = await api.put(`/homeworks/solutions`, {
        homeworkSolution,
    });

    return response.data;
};

export default updateHomeworkSolution;
