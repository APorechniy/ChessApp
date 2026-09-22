import { type StudentUser } from "../types";
import { api } from "../../../axios";

export type UpdateStudentDataParams = {
    studentUser: StudentUser,
}

export type RejectResponse = {
    isUpdatedStudent: boolean;
    errorMessage: string;
}

type Response = {
    isUpdatedStudent: boolean;
};

type UpdateStudentData = ({ studentUser }: UpdateStudentDataParams) => Promise<Response>;

const updateStudentData: UpdateStudentData = async ({ studentUser }) => {
    const response = await api.put(`/users/students`, {
        headers: {
            "Content-Type": "application/json",
        },
        studentUser: studentUser
    });

    return response.data;
};

export default updateStudentData;
