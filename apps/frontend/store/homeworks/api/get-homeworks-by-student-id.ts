import { type Homework } from "../types";
import { api } from "../../../network/instance";

type Response = {
    homeworksList: Homework[];
};

export type GetHomeworksByStudentIdParams = {
    studentId: string
}

type GetHomeworksByStudentId = (params: GetHomeworksByStudentIdParams) => Promise<Response>;

const getHomeworksByStudentId: GetHomeworksByStudentId = async ({ studentId }) => {
    const response = await api.get(`/homeworks/student/${studentId}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response.data;
};

export default getHomeworksByStudentId;
