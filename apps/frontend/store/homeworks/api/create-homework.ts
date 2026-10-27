import { type HomeworkWithoutId } from "../types";
import { api } from "../../../network/instance";

export type CreateHomeworkParams = {
    homework: HomeworkWithoutId,
    studentsAttended: string[],
}

type Response = {
    isCreatedHomework: boolean;
};

type CreateHomework = ({ homework, studentsAttended }: CreateHomeworkParams) => Promise<Response>;

const createHomework: CreateHomework = async ({ homework, studentsAttended }) => {
    const response = await api.post(`/homeworks/`, {
        homework,
        studentsAttended
    });

    return response.data;
};

export default createHomework;
