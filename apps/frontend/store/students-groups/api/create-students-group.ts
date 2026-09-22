import { type StudentsGroup } from "../types";
import { api } from "../../../axios";

export type CreateStudentsGroupParams = {
    studentsGroup: Omit<StudentsGroup, "id">,
}

type Response = {
    isCreatedStudentsGroup: boolean;
};

type CreateStudentsGroup = (params: CreateStudentsGroupParams) => Promise<Response>;

const createStudentsGroup: CreateStudentsGroup = async ({ studentsGroup }) => {
    const response = await api.post(`/students-groups/`, {
        headers: {
            "Content-Type": "application/json",
        },
        studentsGroup: studentsGroup
    });

    return response.data;
};

export default createStudentsGroup;
