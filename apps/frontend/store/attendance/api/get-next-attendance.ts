import { type Attendance } from "../types";
import { api } from "../../../axios";

type Response = {
    nextAttendance: Attendance | null;
};

type GetNextAttendance = () => Promise<Response>;

const getNextAttendance: GetNextAttendance = async () => {
    const response = await api.get(`/attendance/next`, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response.data;
};

export default getNextAttendance;
