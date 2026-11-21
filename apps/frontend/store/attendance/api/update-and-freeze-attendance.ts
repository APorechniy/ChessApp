import { type Attendance } from "../types";
import { api } from "../../../network/instance";
import { type StudentsAttended } from "../../students-attended/types";

export type UpdateAndFreezeAttendanceParams = {
    attendance: Attendance,
    studentsAttended: StudentsAttended[],
}

type Response = {
    updated: boolean;
};

type UpdateAndFreezeAttendance = (params: UpdateAndFreezeAttendanceParams) => Promise<Response>;

const updateAndFreezeAttendance: UpdateAndFreezeAttendance = async ({ attendance, studentsAttended }) => {
    const response = await api.patch(`/attendance/`, {
        attendance: attendance,
        studentsAttended: studentsAttended,
    });

    return response.data;
};

export default updateAndFreezeAttendance;
