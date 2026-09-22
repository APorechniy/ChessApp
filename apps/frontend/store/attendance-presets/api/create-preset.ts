import { type AttendancePresetWithoutId } from "../types";
import { type Task } from "../../tasks/types";
import { api } from "../../../axios";

export type CreateAttendancePresetParams = {
    attendancePreset: AttendancePresetWithoutId,
}

type Response = {
    created: boolean;
};

type CreateAttendancePreset = ({ attendancePreset }: CreateAttendancePresetParams) => Promise<Response>;

const createAttendancePreset: CreateAttendancePreset = async ({ attendancePreset }) => {
    const response = await api.post(`/attendance-preset/`, {
        attendancePreset: attendancePreset,
    });

    return response.data;
};

export default createAttendancePreset;
