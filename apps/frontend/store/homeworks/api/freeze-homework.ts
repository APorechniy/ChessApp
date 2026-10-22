import { type Homework } from "../types";
import { api } from "../../../network/instance";
import { type StudentsAttended } from "../../students-attended/types";

export type FreezeHomeworkParams = {
    homework: Homework,
    studentsAttended: StudentsAttended[],
}

type Response = {
    isFreezeHomework: boolean;
};

type FreezeHomework = ({ homework, studentsAttended }: FreezeHomeworkParams) => Promise<Response>;

const freezeHomework: FreezeHomework = async ({ homework, studentsAttended }) => {
    const response = await api.put(`/homeworks/freeze`, {
        homework,
        studentsAttended
    });

    return response.data;
};

export default freezeHomework;
