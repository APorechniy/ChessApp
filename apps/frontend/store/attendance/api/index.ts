import createAttendance from "./create-attendance"
import createAttendanceByPreset from "./create-attendance-by-preset"
import getAttendances from "./get-attendances"
import getAttendancesForStudent from "./get-attendances-for-student"
import getNextAttendance from "./get-next-attendance"
import getUnclosedAttendances from "./get-unclosed-attendances"
import removeAttendance from "./remove-attendance"
import updateAndFreezeAttendance from "./update-and-freeze-attendance"
import updateAttendance from "./update-attendance"

export const attendanceApi = {
    createAttendance,
    createAttendanceByPreset,
    getAttendances,
    getUnclosedAttendances,
    getAttendancesForStudent,
    getNextAttendance,
    updateAttendance,
    updateAndFreezeAttendance,
    removeAttendance
}