import { type SolutionAnswerView } from "../types";
import { api } from "../../../axios";

export type UpdateSolutionAnswerParams = {
    solutionAnswer: SolutionAnswerView,
}

type Response = {
    isUpdatedSolutionAnswer: boolean;
};

type UpdateSolutionAnswer = ({ solutionAnswer }: UpdateSolutionAnswerParams) => Promise<Response>;

const updateSolutionAnswer: UpdateSolutionAnswer = async ({ solutionAnswer }) => {
    const response = await api.patch(`/homeworks/solutions/answer`, {
        solutionAnswer,
    });

    return response.data;
};

export default updateSolutionAnswer;
