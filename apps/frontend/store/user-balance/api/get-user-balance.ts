import { api } from "../../../network/instance";

type Response = {
    balance: number
};

type GetUserBalance = () => Promise<Response>;

const getUserBalance: GetUserBalance = async () => {
    const response = await api.get(`/balance/`, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response.data;
};

export default getUserBalance;
