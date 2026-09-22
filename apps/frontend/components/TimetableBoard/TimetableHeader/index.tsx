import React, { useMemo } from 'react'
import { ArrowItem, ArrowsBlock, ButtonBlock, CurrentSelectedDate, DateRangeBlock, HeaderContainer, LeftBlock } from './styled'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import { getFormattedDateString } from '../../../utils/get-formatted-date-string'
import { ArrowLeft } from '../../../assets/ArrowLeft'
import { ArrowRight } from '../../../assets/ArrowRight'
import { handleChangeSelectedDate } from '../../../store/attendance'
import { BaseSelect } from '../../../atoms/BaseSelect'
import { MONTHS } from '../../../content/calendar'
import { TextButton } from '../../../atoms/TextButton'
import { PlusIcon } from '../../../assets/Plus'
import { usePlatform } from '../../../hooks/use-platform'
import { handleOpenModal } from '../../../store/system'
import { dateToRequest } from '../../../utils/date-to-request'

export const TimetableHeader = () => {
    const { currentUser } = useAppSelector(({ users }) => users)
    const { selectedDate, attendancesListLoading } = useAppSelector(({ attendance }) => attendance)
    const { datePickerDaysOffset } = useAppSelector(({ system }) => system)

    const platform = usePlatform()

    const dispatch = useAppDispatch();

    const currentDateString = useMemo(() => {
        const formattedDate = getFormattedDateString(selectedDate, datePickerDaysOffset)

        return formattedDate
    }, [selectedDate, datePickerDaysOffset])

    const handleChangeMonth = (option) => {
        const newMothNumber = option.value

        const newDate = new Date(selectedDate)
        newDate.setMonth(newMothNumber)

        const formattedDate = dateToRequest(newDate)

        dispatch(handleChangeSelectedDate({
            selectedDate: formattedDate
        }))
    }

    const handleClickLeftArrow = () => {
        if (attendancesListLoading === "PENDING") return

        const newDate = new Date(selectedDate)
        newDate.setDate(newDate.getDate() - 7)

        const formattedDate = dateToRequest(newDate)

        dispatch(handleChangeSelectedDate({
            selectedDate: formattedDate
        }))
    }

    const handleClickRightArrow = () => {
        if (attendancesListLoading === "PENDING") return

        const newDate = new Date(selectedDate)
        newDate.setDate(newDate.getDate() + 7)

        const formattedDate = dateToRequest(newDate)

        dispatch(handleChangeSelectedDate({
            selectedDate: formattedDate
        }))
    }

    const handleOpenCreateAttendance = () => {
        dispatch(handleOpenModal({
            modalContent: "CREATE_ATTENDANCE"
        }))
    }

    const SELECT_WIDTH = platform === "desktop" ? "20rem" : "14rem"

    return (
        <HeaderContainer>
            <LeftBlock>
                <DateRangeBlock>
                    <CurrentSelectedDate>{currentDateString}</CurrentSelectedDate>
                </DateRangeBlock>

                <ArrowsBlock>
                    <ArrowItem onClick={handleClickLeftArrow}>
                        <ArrowLeft />
                    </ArrowItem>
                    <ArrowItem onClick={handleClickRightArrow}>
                        <ArrowRight color={"var(--primary-btn-color)"} />
                    </ArrowItem>
                </ArrowsBlock>
            </LeftBlock>

            <ButtonBlock>
                <BaseSelect
                    value={String(new Date(selectedDate).getMonth())}
                    options={Object.entries(MONTHS).map((v) => {
                        return {
                            value: v[0],
                            text: v[1],
                        }
                    })}
                    handleSelect={handleChangeMonth}
                    style={{ width: SELECT_WIDTH }}
                />
                {/* TODO: FEATURE-TOGGLE */}
                {currentUser.role !== "student" &&
                    <TextButton
                        text='Добавить занятие'
                        Icon={PlusIcon}
                        onClick={handleOpenCreateAttendance}
                        style={{
                            width: "auto",
                            height: "4.5rem",
                            fontSize: "1.2rem",
                            gap: "1rem",
                            padding: "1rem 2rem",
                            marginLeft: "auto",
                            color: "var(--primary-text-inverted)",
                            fontWeight: 500,
                            border: "1px solid var(--secondary-border-color)",
                        }}
                    />
                }
            </ButtonBlock>
        </HeaderContainer>
    )
}