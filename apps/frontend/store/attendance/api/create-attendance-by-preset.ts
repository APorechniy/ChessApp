import { type AttendanceWithoutId } from "../types";
import { api } from "../../../axios";

export type CreateAttendanceByPresetParams = {
    attendance: AttendanceWithoutId,
}

type Response = {
    created: boolean;
};

type CreateAttendanceByPreset = ({ attendance }: CreateAttendanceByPresetParams) => Promise<Response>;

const createAttendanceByPreset: CreateAttendanceByPreset = async ({ attendance }) => {
    const response = await api.post(`/attendance/preset`, {
        attendance: attendance,
    });

    return response.data;
};

export default createAttendanceByPreset;
