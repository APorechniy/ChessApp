import { type StudentsGroup } from "../types";
import { api } from "../../../axios";

export type UpdateStudentsGroupParams = {
    studentsGroup: StudentsGroup,
}

type Response = {
    isUpdatedStudentsGroup: boolean;
};

type UpdateStudentsGroup = (params: UpdateStudentsGroupParams) => Promise<Response>;

const updateStudentsGroup: UpdateStudentsGroup = async ({ studentsGroup }) => {
    const response = await api.put(`/students-groups/`, {
        headers: {
            "Content-Type": "application/json",
        },
        studentsGroup: studentsGroup
    });

    return response.data;
};

export default updateStudentsGroup;
