import { type Attendance } from "../entities/attendance.entity"

export const getHumanityAttendanceType = (type: Attendance["type"]) => {
    if (type === "GROUP") {
        return "Групповое"
    }

    if (type === "REGULAR") {
        return "Индивидуальное"
    }

    if (type === "TRIAL") {
        return "Пробное"
    }
}