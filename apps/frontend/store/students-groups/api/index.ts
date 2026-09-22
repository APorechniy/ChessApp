import createStudentsGroup from "./create-students-group";
import deleteStudentsGroup from "./delete-students-group";
import getStudentsGroups from "./get-students-groups";
import updateStudentsGroup from "./update-students-group";

export const studentsGroupsApi = {
    getStudentsGroups,
    createStudentsGroup,
    updateStudentsGroup,
    deleteStudentsGroup
}