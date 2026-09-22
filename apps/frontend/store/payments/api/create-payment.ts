import { api } from "../../../axios";

export type CreatePaymentParams = {
    cost: number,
}

type Response = {
    widgetId: string;
    paymentId: string;
};

type CreatePayment = ({ cost }: CreatePaymentParams) => Promise<Response>;

const createPayment: CreatePayment = async ({ cost }) => {
    const response = await api.post(`/payments/`, {
        cost: cost
    });

    return response.data;
};

export default createPayment;
