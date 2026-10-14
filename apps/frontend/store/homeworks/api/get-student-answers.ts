import { type SolutionAnswerView } from "../types";
import { api } from "../../../axios";

type Response = {
    homeworkAnswers: SolutionAnswerView[] | null;
};

export type GetStudentAnswersParams = {
    homeworkId: string;
    solutionId: string;
}

type GetStudentAnswers = ({ homeworkId, solutionId }: GetStudentAnswersParams) => Promise<Response>;

const getStudentAnswers: GetStudentAnswers = async ({ homeworkId, solutionId, }) => {
    const response = await api.get(`/homeworks/answers/${homeworkId}/${solutionId}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response.data;
};

export default getStudentAnswers;
