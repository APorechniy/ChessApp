import { type Attendance } from "../types";
import { api } from "../../../network/instance";

export type GetAttendancesAnyParams = {
    groupId?: string,
    studentId?: string,
}

type Response = {
    attendancesList: Attendance[];
};

type GetAttendancesAny = (params: GetAttendancesAnyParams) => Promise<Response>;

const getAttendancesAny: GetAttendancesAny = async ({ groupId, studentId }) => {
    const response = await api.get(`/attendance/any?${groupId ? `groupId=${groupId}` : ''}${studentId ? `studentId=${studentId}` : ''}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response.data;
};

export default getAttendancesAny;
