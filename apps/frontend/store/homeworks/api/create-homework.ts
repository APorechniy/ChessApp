import { type HomeworkWithoutId } from "../types";
import { api } from "../../../network/instance";

export type CreateHomeworkParams = {
    homework: HomeworkWithoutId,
}

type Response = {
    isCreatedHomework: boolean;
};

type CreateHomework = ({ homework }: CreateHomeworkParams) => Promise<Response>;

const createHomework: CreateHomework = async ({ homework }) => {
    const response = await api.post(`/homeworks/`, {
        homework,
    });

    return response.data;
};

export default createHomework;
