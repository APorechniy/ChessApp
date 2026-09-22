import { type CoachUser } from "../types";
import { api } from "../../../axios";

type Response = {
    coachesList: CoachUser[];
};

type GetCoachesList = () => Promise<Response>;

const getCoachesList: GetCoachesList = async () => {
    const response = await api.get(`/users/coaches`, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response.data;
};

export default getCoachesList;
