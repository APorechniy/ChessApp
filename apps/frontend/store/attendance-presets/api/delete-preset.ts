import { api } from "../../../axios";

export type DeleteAttendancePresetParams = {
    attendancePresetId: string,
}

type Response = {
    isDeleted: boolean;
};

type DeleteAttendancePreset = ({ attendancePresetId }: DeleteAttendancePresetParams) => Promise<Response>;

const deleteAttendancePreset: DeleteAttendancePreset = async ({ attendancePresetId }) => {
    const response = await api.delete(`/attendance-preset/?attendancePresetId=${attendancePresetId}`);

    return response.data;
};

export default deleteAttendancePreset;
