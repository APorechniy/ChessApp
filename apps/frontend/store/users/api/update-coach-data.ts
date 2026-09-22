import { type CoachUser } from "../types";
import { api } from "../../../axios";

export type UpdateCoachDataParams = {
    coachUser: CoachUser,
}

export type RejectResponse = {
    isUpdatedStudent: boolean;
    errorMessage: string;
}

type Response = {
    isUpdatedCoach: boolean;
    errorMessage?: string;
};

type UpdateCoachData = ({ coachUser }: UpdateCoachDataParams) => Promise<Response>;

const updateCoachData: UpdateCoachData = async ({ coachUser }) => {
    const response = await api.put(`/users/coaches`, {
        headers: {
            "Content-Type": "application/json",
        },
        coachUser: coachUser
    });

    return response.data;
};

export default updateCoachData;
