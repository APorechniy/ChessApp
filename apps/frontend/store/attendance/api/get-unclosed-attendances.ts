import { type Attendance } from "../types";
import { api } from "../../../axios";

export type GetUnclosedAttendancesParams = {
    coachId?: string
}

type Response = {
    unclosedAttendancesList: Attendance[];
};

type GetAttendances = (params: GetUnclosedAttendancesParams) => Promise<Response>;

const getUnclosedAttendances: GetAttendances = async ({ coachId }) => {
    const response = await api.get(`/attendance/unclosed${coachId ? `?coachId=${coachId}` : ""}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response.data;
};

export default getUnclosedAttendances;
