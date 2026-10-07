import { type Homework } from "../types";
import { api } from "../../../axios";

type Response = {
    isDeletedHomework: boolean;
};

export type DeleteHomeworkParams = {
    homeworkId: string
}

type DeleteHomework = ({ homeworkId }: DeleteHomeworkParams) => Promise<Response>;

const deleteHomework: DeleteHomework = async ({ homeworkId }) => {
    const response = await api.delete(`/homeworks/${homeworkId}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response.data;
};

export default deleteHomework;
