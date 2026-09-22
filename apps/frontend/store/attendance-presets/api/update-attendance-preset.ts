import { type AttendancePreset } from "../types";
import { api } from "../../../axios";

export type UpdateAttendancePresetParams = {
    attendancePreset: AttendancePreset,
}

type Response = {
    isUpdated: boolean;
};

type UpdateAttendancePreset = ({ attendancePreset }: UpdateAttendancePresetParams) => Promise<Response>;

const updateAttendancePreset: UpdateAttendancePreset = async ({ attendancePreset }) => {
    const response = await api.put(`/attendance-preset/`, {
        attendancePreset: attendancePreset,
    });

    return response.data;
};

export default updateAttendancePreset;
