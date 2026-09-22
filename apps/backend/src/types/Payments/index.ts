export type UkassaPayment = {
    id: string;
    status: "canceled" | "waiting_for_capture" | "succeeded" | "pending";
    amount: {
        value: string;
        currency: "RUB";
    };
    description: string;
    recipient: {
        account_id: string;
        gateway_id: string;
    };
    created_at: string;
    confirmation: {
        type: string;
        confirmation_token: string;
    };
    test: boolean;
    paid: boolean;
    refundable: boolean;
    metadata: any;
};
