import { type AttendancePreset } from "../types";
import { api } from "../../../axios";

type Response = {
    attendancePresetsList: AttendancePreset[];
};

type GetAttendancePresets = () => Promise<Response>;

const getAttendancePresets: GetAttendancePresets = async () => {
    const response = await api.get(`/attendance-preset`, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response.data;
};

export default getAttendancePresets;
