import { type Homework } from "../types";
import { api } from "../../../network/instance";

export type UpdateHomeworkParams = {
    homework: Homework,
}

type Response = {
    isUpdatedHomework: boolean;
};

type UpdateHomework = ({ homework }: UpdateHomeworkParams) => Promise<Response>;

const updateHomework: UpdateHomework = async ({ homework }) => {
    const response = await api.patch(`/homeworks/`, {
        homework,
    });

    return response.data;
};

export default updateHomework;
