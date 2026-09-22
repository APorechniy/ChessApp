import { type AttendanceWithoutId } from "../types";
import { type Task } from "../../tasks/types";
import { api } from "../../../axios";

export type CreateAttendanceParams = {
    attendance: AttendanceWithoutId,
}

type Response = {
    created: boolean;
};

type CreateAttendance = ({ attendance }: CreateAttendanceParams) => Promise<Response>;

const createAttendance: CreateAttendance = async ({ attendance }) => {
    const response = await api.post(`/attendance/`, {
        attendance: attendance,
    });

    return response.data;
};

export default createAttendance;
