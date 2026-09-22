import { type Level } from "../types";
import { api } from "../../../axios";

type Response = {
    levelsList: Level[];
};

type GetLevelsList = () => Promise<Response>;

const getLevels: GetLevelsList = async () => {
    const response = await api.get(`/levels/`, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response.data;
};

export default getLevels;
