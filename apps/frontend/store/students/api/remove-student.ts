import { api } from "../../../axios";

export type RemoveStudentParams = {
    studentId: string,
}

type Response = {
    isRemoveStudent: boolean;
};

type RemoveStudent = ({ studentId }: RemoveStudentParams) => Promise<Response>;

const removeStudent: RemoveStudent = async ({ studentId }) => {
    const response = await api.delete(`/students/?studentId=${studentId}`);

    return response.data;
};

export default removeStudent;
