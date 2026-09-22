import { type User } from "../types";
import { api } from "../../../axios";

type Response = {
    user: User;
};

type GetUser = () => Promise<Response>;

const getUser: GetUser = async () => {
    const response = await api.get(`/users/`, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response.data;
};

export default getUser;
