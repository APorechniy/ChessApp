import { type StudentsAttended } from "../types";
import { api } from "../../../axios";

type Response = {
    studentsAttended: StudentsAttended[];
};

export type GetStudentsAttendedParams = {
    attendanceId: string
}

type GetStudentsAttended = (params: GetStudentsAttendedParams) => Promise<Response>;

const getStudentsAttended: GetStudentsAttended = async ({ attendanceId }) => {
    const response = await api.get(`/students-attended/?attendanceId=${attendanceId}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response.data;
};

export default getStudentsAttended;
