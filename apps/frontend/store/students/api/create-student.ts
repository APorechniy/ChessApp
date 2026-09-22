import { type Student } from "../types";
import { api } from "../../../axios";

export type CreateStudentParams = {
    student: Omit<Student, "id">,
}

type Response = {
    created: boolean;
};

type CreateStudent = ({ student }: CreateStudentParams) => Promise<Response>;

const createStudent: CreateStudent = async ({ student }) => {
    const response = await api.post(`/students/create`, {
        headers: {
            "Content-Type": "application/json",
        },
        student: student
    });

    return response.data;
};

export default createStudent;
