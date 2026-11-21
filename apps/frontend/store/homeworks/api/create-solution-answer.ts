import { type SolutionAnswerWithoutId } from "../types";
import { api } from "../../../network/instance";

export type CreateSolutionAnswerParams = {
    solutionAnswer: SolutionAnswerWithoutId,
}

type Response = {
    isCreatedAnswer: boolean;
};

type CreateSolutionAnswer = ({ solutionAnswer }: CreateSolutionAnswerParams) => Promise<Response>;

const createSolutionAnswer: CreateSolutionAnswer = async ({ solutionAnswer }) => {
    const response = await api.post(`/homeworks/solutions/answer`, {
        solutionAnswer,
    });

    return response.data;
};

export default createSolutionAnswer;
