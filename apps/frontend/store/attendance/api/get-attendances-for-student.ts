import { type Attendance } from "../types";
import { api } from "../../../axios";

export type GetAttendancesForStudentParams = {
    date?: Date
}

type Response = {
    attendancesList: Attendance[];
};

type GetAttendancesForStudent = (params: GetAttendancesForStudentParams) => Promise<Response>;

const getAttendancesForStudent: GetAttendancesForStudent = async ({ date }) => {
    const response = await api.get(`/attendance/student?date=${date?.toISOString().split('T')[0] || ""}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response.data;
};

export default getAttendancesForStudent;
