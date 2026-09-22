import { type Attendance } from "../types";
import { api } from "../../../axios";
import { type Task } from "../../tasks/types";
import { type StudentsAttended } from "../../students-attended/types";

export type UpdateAttendanceParams = {
    attendance: Attendance,
    studentsAttended: StudentsAttended[],
}

type Response = {
    updated: boolean;
};

type UpdateAttendance = ({ attendance, studentsAttended }: UpdateAttendanceParams) => Promise<Response>;

const updateAttendance: UpdateAttendance = async ({ attendance, studentsAttended }) => {
    const response = await api.put(`/attendance/`, {
        attendance: attendance,
        studentsAttended: studentsAttended,
    });

    return response.data;
};

export default updateAttendance;
