import getAllStudents from "./get-all-students"
import createStudent from "./create-student"
import updateStudent from "./update-student"
import removeStudent from "./remove-student"
import getStudentStatistic from "./get-statistic"

export const studentsApi = {
    getAllStudents,
    createStudent,
    updateStudent,
    removeStudent,
    getStudentStatistic,
}