import { type HomeworkSolution } from "../types";
import { api } from "../../../axios";

type Response = {
    solution: HomeworkSolution | null;
};

export type GetCurrentSolutionParams = {
    homeworkId: string
    studentId: string
}

type GetCurrentSolution = ({ homeworkId, studentId }: GetCurrentSolutionParams) => Promise<Response>;

const getCurrentSolution: GetCurrentSolution = async ({ homeworkId, studentId }) => {
    const response = await api.get(`/homeworks/solutions/${homeworkId}/${studentId}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response.data;
};

export default getCurrentSolution;
