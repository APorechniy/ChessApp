import { type CoachData } from "../types";
import { api } from "../../../axios";

export type CreateCoachParams = {
    coach: Omit<CoachData, "id">,
}

type Response = {
    created: boolean;
};

type CreateCoach = ({ coach }: CreateCoachParams) => Promise<Response>;

const createCoach: CreateCoach = async ({ coach }) => {
    const response = await api.post(`/users/coaches`, {
        headers: {
            "Content-Type": "application/json",
        },
        coach: coach
    });

    return response.data;
};

export default createCoach;
