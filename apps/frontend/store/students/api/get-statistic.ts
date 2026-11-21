import { type StudentStatistic } from "../types";
import { api } from "../../../network/instance";

export type GetStudentStatisticParams = {
    studentId: string
}

type Response = {
    studentStatistic: StudentStatistic;
};

type GetStudentStatistic = (params: GetStudentStatisticParams) => Promise<Response>;

const getStudentStatistic: GetStudentStatistic = async ({ studentId }) => {
    const response = await api.get(`/students/statistic/${studentId}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response.data;
};

export default getStudentStatistic;
