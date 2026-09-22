import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { handleCloseModal } from "../../../store/system"
import { PutBalanceModal, PutBalanceForm, PutBalanceFormTitle, InputsBlock, CostBlock, CostText, Cost, UKassaBlock, CloseButton } from "./styled"
import { getAttendancePrice } from "../../../utils/get-attendance-price"
import { createPayment } from "../../../store/payments/thunk/create-payment"
import { BaseInput } from "../../../atoms/BaseInput/Input"
import { TextButton } from "../../../atoms/TextButton"
import { PaymentStatusBanner } from "../../PaymentStatusBanner"
import { handleClearPayments, handleClearPaymentStatus } from "../../../store/payments"
import { ClearIcon } from "../../../assets/ClearIcon"

export const PutBalance = () => {
    const [isCompletedPayment, setIsCompletedPayment] = useState(false)
    const [attendacesCounter, setAttendancesCounter] = useState(1)
    const [isRenderedPaymentForm, setIsRenderedPaymentForm] = useState(false)

    const { widgetId, paymentId, isLoadingPayment } = useAppSelector(({ payments }) => payments)

    const dispatch = useAppDispatch()

    useEffect(() => {
        return () => {
            dispatch(handleClearPayments())
            dispatch(handleClearPaymentStatus())
        }
    }, [])

    useEffect(() => {
        if (widgetId && isLoadingPayment === 'SUCCESS' && !isRenderedPaymentForm) {
            // @ts-ignore
            const checkout = new window.YooMoneyCheckoutWidget({
                confirmation_token: widgetId,
                error_callback: function (error) {
                    console.log(error)
                },

            })

            checkout.on('complete', () => {
                setIsCompletedPayment(true)
                checkout.destroy()
            })

            // id контейнера для рендера
            checkout.render('payment-form')
            setIsRenderedPaymentForm(true)
        }
    }, [widgetId, isLoadingPayment])

    const closeModal = () => {
        dispatch(handleClearPayments())
        dispatch(handleClearPaymentStatus())
        dispatch(handleCloseModal())
    }

    const handleUpBalance = (event) => {
        event.preventDefault();
        const attendancePrice = Number(getAttendancePrice() * attendacesCounter)

        dispatch(createPayment({
            cost: attendancePrice
        }))
    }

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const numbersOnly = Number(event.target.value.replace(/[^\d]/g, ''));

        setAttendancesCounter(numbersOnly)
    }

    return (
        <PutBalanceModal onClick={(e) => e.stopPropagation()}>
            <CloseButton>
                <ClearIcon onClick={closeModal} />
            </CloseButton>
            <PutBalanceFormTitle className="put-balance-form-title">Пополнение баланса</PutBalanceFormTitle>
            {Boolean(!widgetId && isLoadingPayment !== 'SUCCESS' && !isCompletedPayment) &&
                <PutBalanceForm onSubmit={handleUpBalance}>
                    <InputsBlock>
                        <BaseInput
                            value={String(attendacesCounter)}
                            handleInput={handleInput}
                            id={'attendance-counter'}
                            label="Количество занятий"
                            placeholder='Количество занятий'
                        />

                        <TextButton
                            text={'Пополнить баланс'}
                            style={{ height: '4rem', marginTop: 'auto', marginBottom: '0.8rem' }}
                            role="submit"
                        />
                    </InputsBlock>
                    <CostBlock>
                        <CostText>
                            {`Итоговая сумма:`}
                        </CostText>
                        <Cost>
                            {`${Number(getAttendancePrice() * attendacesCounter)} ₽`}
                        </Cost>
                    </CostBlock>
                </PutBalanceForm>
            }
            <UKassaBlock id="payment-form"></UKassaBlock>
            {
                isCompletedPayment &&
                <PaymentStatusBanner paymentId={paymentId} />
            }
        </PutBalanceModal>
    )
}