import { api } from "../../../axios";
import { isValidSearchString } from "../../../utils/validate-search-string";
import { UserPayment } from "../types";

export type GetUserPaymentsHistoryParams = {
    search?: string;
}

type Response = {
    paymentsHistory: UserPayment[] | null
};

type GetUserPaymentsHistory = (params: GetUserPaymentsHistoryParams) => Promise<Response>;

const getUserPaymentsHistory: GetUserPaymentsHistory = async ({ search }) => {
    const searchQuery = Boolean(search && isValidSearchString(search)) ? `?search=${search}` : ''
    const response = await api.get(`/user-payments/${searchQuery}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response.data;
};

export default getUserPaymentsHistory;
