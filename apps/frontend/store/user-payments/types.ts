import type { RequestStatus } from "../../types/types"
import { type PaymentStatus } from "../payments/types"
import { type Student } from "../students/types"

export type UserPayment = {
    user: Pick<Student, "id"> & Pick<Student, "firstName"> & Pick<Student, "lastName">,
    payment: {
        id: string,
        amountValue: string,
        createdAt: string,
        status: PaymentStatus
    }
}

export type UserPaymentsState = {
    paymentsHistory: UserPayment[],

    isLoadingPaymentHistory: RequestStatus,
}