import { api } from "../../../axios";

export type ExcludeDateFromPresetParams = {
    attendancePresetId: string,
    excludedDate: string,
}

type Response = {
    isUpdated: boolean;
};

type ExcludeDateFromPreset = (params: ExcludeDateFromPresetParams) => Promise<Response>;

const excludeDateFromPreset: ExcludeDateFromPreset = async ({ attendancePresetId, excludedDate }) => {
    const response = await api.patch(`/attendance-preset/exclude`, {
        attendancePresetId: attendancePresetId,
        excludedDate: excludedDate
    });

    return response.data;
};

export default excludeDateFromPreset;
