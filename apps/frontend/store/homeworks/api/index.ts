import createHomework from "./create-homework"
import getCurrentHomework from "./get-current-homework"
import freezeHomework from "./freeze-homework"
import deleteHomework from "./delete-homework"
import updateHomework from "./update-homework"

export const homeworksApi = {
    getCurrentHomework,
    createHomework,
    freezeHomework,
    deleteHomework,
    updateHomework,
}