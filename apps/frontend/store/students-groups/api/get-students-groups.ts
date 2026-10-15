import { type StudentsGroup } from "../types";
import { api } from "../../../network/instance";

type Response = {
    studentsGroups: StudentsGroup[];
};

type GetStudentsGroups = () => Promise<Response>;

const getStudentsGroups: GetStudentsGroups = async () => {
    const response = await api.get(`/students-groups/`, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response.data;
};

export default getStudentsGroups;
