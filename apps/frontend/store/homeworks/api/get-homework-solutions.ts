import { type HomeworkSolution } from "../types";
import { api } from "../../../axios";

type Response = {
    homeworkSolutionsList: HomeworkSolution[] | null;
};

export type GetHomeworkSolutionsParams = {
    homeworkId: string
}

type GetHomeworkSolutions = ({ homeworkId }: GetHomeworkSolutionsParams) => Promise<Response>;

const getHomeworkSolutions: GetHomeworkSolutions = async ({ homeworkId }) => {
    const response = await api.get(`/homeworks/solutions/${homeworkId}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response.data;
};

export default getHomeworkSolutions;
