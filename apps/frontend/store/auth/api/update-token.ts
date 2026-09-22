import { AxiosResponse } from "axios";
import { api } from "../../../axios";

type Response = AxiosResponse;

type UpdateTokens = () => Promise<Response>;

const updateTokens: UpdateTokens = async () => {
    const response = await api.get(`/auth/update-tokens`, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response;
};

export default updateTokens;
