import createAttendancePreset from "./create-preset"
import deleteAttendancePreset from "./delete-preset"
import excludeDateFromPreset from "./exclude-date"
import getAttendancePresets from "./get-attendance-presets"
import updateAttendancePreset from "./update-attendance-preset"

export const attendancePresetsApi = {
    getAttendancePresets,
    createAttendancePreset,
    excludeDateFromPreset,
    updateAttendancePreset,
    deleteAttendancePreset
}