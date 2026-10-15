import { type Homework } from "../types";
import { api } from "../../../network/instance";

type Response = {
    homework: Homework | null;
};

export type GetCurrentHomeworkParams = {
    attendanceId: string
}

type GetHomework = ({ attendanceId }: GetCurrentHomeworkParams) => Promise<Response>;

const getCurrentHomework: GetHomework = async ({ attendanceId }) => {
    const response = await api.get(`/homeworks/attendance/${attendanceId}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response.data;
};

export default getCurrentHomework;
