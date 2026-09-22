import React, { useEffect } from "react";
import { withAuth } from "../utils/with-auth";
import { useAppDispatch } from "../store/store";
import { handleClearPayments, handleClearPaymentStatus } from "../store/payments";
import { PaymentStatusBanner } from "../components/PaymentStatusBanner";
import { useSearchParams } from 'next/navigation'
import { PageWrapper } from "../atoms/PageWrapper";

const ConfirmPayment = withAuth(() => {
    const searchParams = useSearchParams()
    const paymentId = searchParams.get("paymentId")
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(handleClearPayments())
        dispatch(handleClearPaymentStatus())
    }, [])

    return (
        <PageWrapper>
            <PaymentStatusBanner paymentId={paymentId} />
        </PageWrapper>
    )
})

export default ConfirmPayment