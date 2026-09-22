import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { getUserPaymentsHistory } from '../../store/user-payments/thunk/get-user-payments-history'
import { DateItem, Title, LeftPaymentBlock, Name, PaymentItem, StyledInput, StyledInputWrapper, Tag, Wrapper } from './styled'
import { Loader } from '../../atoms/Loader'
import { SearchIcon } from '../../assets/SearchIcon'
import { ClearIcon } from '../../assets/ClearIcon'
import { getHumanityDate } from '../../utils/get-humanity-date'

export const PaymentsHistoryWidget = () => {
    const [searchString, setSearchString] = useState<string>();
    const requestTimer = useRef<NodeJS.Timeout>(null);

    const { settings } = useAppSelector(({ system }) => system);

    const { paymentsHistory, isLoadingPaymentHistory } = useAppSelector(({ userPayments }) => userPayments)
    const dispatch = useAppDispatch()

    useEffect(() => {
        getHistory(searchString)
    }, [searchString])

    const getHistory = (str: string) => {
        if (requestTimer.current) {
            clearTimeout(requestTimer.current)
        }

        requestTimer.current = setTimeout(() => {
            dispatch(getUserPaymentsHistory({
                search: str
            }))
        }, 1000)
    }

    const handleChangeSearchString: React.ChangeEventHandler<HTMLInputElement> = (event) =>
        setSearchString(event.target.value)

    const handleClear = () => setSearchString('')

    const isSameDay = (firstDate: string, secondDate: string) => {
        const first = new Date(firstDate)
        const second = new Date(secondDate)

        return first.getFullYear() === second.getFullYear() &&
            first.getMonth() === second.getMonth() &&
            first.getDate() === second.getDate();
    }

    if (!settings?.ukassaIsConnected) {
        return null
    }

    return (
        <Wrapper>
            <Title>Последние платежи</Title>
            <StyledInputWrapper>
                <SearchIcon />
                <StyledInput
                    placeholder='Поиск...'
                    value={searchString}
                    onChange={handleChangeSearchString}
                />
                <ClearIcon
                    onClick={handleClear}
                />
            </StyledInputWrapper>
            {
                (isLoadingPaymentHistory === "IDLE" || isLoadingPaymentHistory === "PENDING")
                    ?
                    <Loader />
                    :
                    paymentsHistory.map((p, index) => (
                        <Fragment key={p.payment.id}>
                            {
                                Boolean(
                                    (index - 1 >= 0 &&
                                        paymentsHistory[index] &&
                                        paymentsHistory[index - 1] &&
                                        !isSameDay(paymentsHistory[index - 1].payment.createdAt, paymentsHistory[index].payment.createdAt))
                                    || index === 0
                                ) &&
                                <DateItem>{getHumanityDate(paymentsHistory[index].payment.createdAt)}</DateItem>
                            }
                            <PaymentItem key={p.payment.id}>
                                <LeftPaymentBlock>
                                    <Name>{`${p.user.lastName} ${p.user.firstName}`}</Name>
                                </LeftPaymentBlock>
                                <Tag>{`+${Number(p.payment.amountValue)}₽`}</Tag>
                            </PaymentItem>
                        </Fragment>
                    ))

            }
        </Wrapper>
    )
}