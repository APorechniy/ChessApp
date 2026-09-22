import { api } from "../../../axios";
import { BASE_URL } from "../const/actions";
import type { PaymentStatus } from "../types";

export type GetPaymentStatusParams = {
    paymentId: string
}

type Response = {
    status: PaymentStatus;
};

type GetPaymentStatus = (params: GetPaymentStatusParams) => Promise<Response>;

const getPaymentStatus: GetPaymentStatus = async (params) => {
    const requestUrl = `${BASE_URL}status?paymentId=${params.paymentId}`
    const response = await api.get(requestUrl, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response.data;
};

export default getPaymentStatus;
