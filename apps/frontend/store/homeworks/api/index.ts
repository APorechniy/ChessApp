import createHomework from "./create-homework"
import getCurrentHomework from "./get-current-homework"
import freezeHomework from "./freeze-homework"
import deleteHomework from "./delete-homework"
import updateHomework from "./update-homework"
import getHomeworksList from "./get-homeworks-list"
import getHomeworkSolutions from "./get-homework-solutions"
import getHomeworksByStudentId from "./get-homeworks-by-student-id"
import getCurrentSolution from "./get-current-solution"
import getHomeworkTasks from "./get-homework-tasks"
import createSolutionAnswer from "./create-solution-answer"
import updateHomeworkSolution from "./update-homework-solution"

export const homeworksApi = {
    getCurrentHomework,
    getHomeworksList,
    getHomeworkSolutions,
    getHomeworksByStudentId,
    getHomeworkTasks,
    getCurrentSolution,
    createHomework,
    createSolutionAnswer,
    freezeHomework,
    deleteHomework,
    updateHomework,
    updateHomeworkSolution,
}