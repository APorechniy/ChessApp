import { api } from "../../../axios";

export type RemoveCoachParams = {
    coachId: string,
}

type Response = {
    isRemoveCoach: boolean;
};

type RemoveCoach = ({ coachId }: RemoveCoachParams) => Promise<Response>;

const removeCoach: RemoveCoach = async ({ coachId }) => {
    const response = await api.delete(`/users/coaches/?coachId=${coachId}`);

    return response.data;
};

export default removeCoach;
