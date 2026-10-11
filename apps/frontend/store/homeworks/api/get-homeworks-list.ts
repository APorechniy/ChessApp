import { type Homework } from "../types";
import { api } from "../../../axios";

type Response = {
    homeworksList: Homework[];
};

type GetHomeworksList = () => Promise<Response>;

const getHomeworksList: GetHomeworksList = async () => {
    const response = await api.get(`/homeworks/`, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response.data;
};

export default getHomeworksList;
