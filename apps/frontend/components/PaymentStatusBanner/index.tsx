import React, { useEffect } from "react";
import { IconWrapper, MessageBlock, Title, Wrapper } from "./styled";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getPaymentStatus } from "../../store/payments/thunk/get-payment-status";
import { OkIcon } from "../../assets/Ok";
import { WaitIcon } from "../../assets/Wait";
import { CancelIcon } from "../../assets/Cancel";
import { TextButton } from "../../atoms/TextButton";

export const PaymentStatusBanner = ({ paymentId }: { paymentId: string }) => {
    const { paymentStatus } = useAppSelector(({ payments }) => payments)

    const dispatch = useAppDispatch()

    const handleCheckPaymentStatus = async () => {
        await dispatch(getPaymentStatus({
            paymentId: paymentId
        }))
    }

    useEffect(() => {
        if (paymentId) {
            handleCheckPaymentStatus()
        }
    }, [paymentId])

    return (
        <Wrapper>
            {
                paymentStatus === "succeeded" &&
                <MessageBlock>
                    <IconWrapper>
                        <OkIcon />
                    </IconWrapper>
                    <Title>
                        Сумма зачислена на ваш счет
                    </Title>
                </MessageBlock>
            }
            {
                paymentStatus === "pending" &&
                <MessageBlock>
                    <IconWrapper>
                        <WaitIcon />
                    </IconWrapper>
                    <Title>
                        Ожидаем совершение платежа
                    </Title>
                </MessageBlock>
            }
            {
                paymentStatus === "waiting_for_capture" &&
                <MessageBlock>
                    <IconWrapper>
                        <WaitIcon />
                    </IconWrapper>
                    <Title>
                        Ожидаем подтверждение платежа
                    </Title>
                </MessageBlock>
            }
            {
                paymentStatus === "canceled" &&
                <MessageBlock>
                    <IconWrapper>
                        <CancelIcon />
                    </IconWrapper>
                    <Title>
                        Платеж отклонен
                    </Title>
                </MessageBlock>
            }
            {
                Boolean(paymentStatus && paymentStatus !== 'succeeded' && paymentStatus !== 'canceled') &&
                <TextButton
                    text={"Обновить"}
                    onClick={handleCheckPaymentStatus}
                    backgroundColor="var(--primary-text-inverted)"
                    style={{ height: '4rem', color: "var(--secondary-text)" }}
                />
            }
        </Wrapper>
    )
}