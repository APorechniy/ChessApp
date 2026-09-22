import { api } from "../../../axios";

export type DeleteStudentsGroupParams = {
    studentsGroupId: string,
}

type Response = {
    isDeletedStudentsGroup: boolean;
};

type DeleteStudentsGroup = (params: DeleteStudentsGroupParams) => Promise<Response>;

const deleteStudentsGroup: DeleteStudentsGroup = async ({ studentsGroupId }) => {
    const response = await api.delete(`/students-groups/?studentsGroupId=${studentsGroupId}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response.data;
};

export default deleteStudentsGroup;
