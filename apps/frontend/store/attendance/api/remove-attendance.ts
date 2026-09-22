import { api } from "../../../axios";

export type RemoveAttendanceParams = {
    attendanceId: string,
}

type Response = {
    isRemovedAttendance: boolean;
};

type RemoveAttendance = ({ attendanceId }: RemoveAttendanceParams) => Promise<Response>;

const removeAttendance: RemoveAttendance = async ({ attendanceId }) => {
    const response = await api.delete(`/attendance/?attendanceId=${attendanceId}`);

    return response.data;
};

export default removeAttendance;
