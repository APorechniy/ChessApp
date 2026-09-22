import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { LeftBlock, RightBlock, WidgetItem, Tag, Wrapper, Title, NextAttendanceBlock, TitleSecondary, SubTitleSecondary } from './styled'
import { getNextAttendance } from '../../store/attendance/thunk/get-next-attendance'
import { getUserBalance } from '../../store/user-balance/thunk/get-user-balance'
import { IconButton } from '../../atoms/IconButton'
import { PlusIcon } from '../../assets/Plus'
import { getHumanityDate } from '../../utils/get-humanity-date'
import { getHourse } from '../../utils/get-hourse'
import { handleOpenModal } from '../../store/system'

export const StudentDataWidget = () => {
    const { settings } = useAppSelector(({ system }) => system)

    const { balance } = useAppSelector(({ userBalance }) => userBalance)
    const { nextAttendance, isLoadingNextAttendance } = useAppSelector(({ attendance }) => attendance)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getUserBalance());
        dispatch(getNextAttendance());
    }, [])

    const handleGoBalance = () => {
        ym(106697518, 'reachGoal', 'balance-click')
        dispatch(handleOpenModal({
            modalContent: "PUT_BALANCE"
        }))
    }

    if (!settings?.ukassaIsConnected) {
        return null
    }

    return (
        <Wrapper>
            <WidgetItem>
                <LeftBlock>
                    <Title>Баланс кошелька</Title>
                </LeftBlock>
                <RightBlock>
                    <IconButton
                        Icon={() => <PlusIcon color={"var(--secondary-border-color)"} />}
                        onClick={handleGoBalance}
                        style={{
                            height: '3rem',
                            width: '3rem',
                            marginRight: '0.8rem',
                            padding: '0.8rem',
                            backgroundColor: "inherit",
                            border: "0.1rem solid var(--secondary-border-color)",
                        }}
                    />
                    <Tag
                        bgColor='var(--primary-btn-color)'
                    >
                        <p>
                            {`${balance} ₽`}
                        </p>
                    </Tag>
                </RightBlock>
            </WidgetItem>

            {Boolean(nextAttendance && isLoadingNextAttendance === 'SUCCESS') &&
                <NextAttendanceBlock>
                    <WidgetItem>
                        <LeftBlock>
                            <TitleSecondary>Ближайшее занятие</TitleSecondary>
                            <SubTitleSecondary>{getHumanityDate(nextAttendance.startDate)}</SubTitleSecondary>
                        </LeftBlock>
                        <RightBlock>
                            <Tag
                                bgColor='var(--primary-orange)'
                            >
                                <p>
                                    {`${getHourse(nextAttendance.startDate)}`}
                                </p>
                            </Tag>
                        </RightBlock>
                    </WidgetItem>

                    <WidgetItem>
                        <LeftBlock>
                            <TitleSecondary>Преподаватель</TitleSecondary>
                            <SubTitleSecondary>{`${nextAttendance.coach.firstName} ${nextAttendance.coach.lastName}`}</SubTitleSecondary>
                        </LeftBlock>
                    </WidgetItem>

                    <WidgetItem>
                        <LeftBlock>
                            <TitleSecondary>Тема занятия</TitleSecondary>
                            <SubTitleSecondary>{nextAttendance.learningTopic.name}</SubTitleSecondary>
                        </LeftBlock>
                    </WidgetItem>
                </NextAttendanceBlock>
            }
        </Wrapper>
    )
}