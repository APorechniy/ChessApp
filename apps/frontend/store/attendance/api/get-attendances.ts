import { type Attendance } from "../types";
import { api } from "../../../axios";

export type GetAttendancesParams = {
    date?: string,
}

type Response = {
    attendancesList: Attendance[];
};

type GetAttendances = (params: GetAttendancesParams) => Promise<Response>;

const getAttendances: GetAttendances = async ({ date }) => {
    const response = await api.get(`/attendance?date=${date}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response.data;
};

export default getAttendances;
