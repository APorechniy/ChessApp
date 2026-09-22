import { type Student } from "../types";
import { api } from "../../../axios";

export type UpdateStudentParams = {
    student: Student,
}

type Response = {
    isUpdatedStudent: boolean;
};

type UpdateStudent = ({ student }: UpdateStudentParams) => Promise<Response>;

const updateStudent: UpdateStudent = async ({ student }) => {
    const response = await api.put(`/students/`, {
        headers: {
            "Content-Type": "application/json",
        },
        student: student
    });

    return response.data;
};

export default updateStudent;
