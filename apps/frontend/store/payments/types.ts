import type { RequestStatus } from "../../types/types"

export type PaymentStatus = "canceled" | "waiting_for_capture" | "succeeded" | "pending";

export type PaymentsState = {
    widgetId: string | null,
    paymentId: string | null,
    paymentStatus: PaymentStatus | null,

    isLoadingPayment: RequestStatus
    isLoadingPaymentStatus: RequestStatus,
}