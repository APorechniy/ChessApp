import createCoach from "./create-coach"
import getCoachesList from "./get-coaches-list"
import getUser from "./get-user"
import removeCoach from "./remove-coach"
import updateCoachData from "./update-coach-data"
import updateStudentData from "./update-student-data"

export const usersApi = {
    createCoach,
    getUser,
    getCoachesList,
    updateCoachData,
    updateStudentData,
    removeCoach,
}