import React, { useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import { DateItem, DateNumber, DateWrapper, Day } from './styled'
import { DAYS } from '../../../content/calendar'
import { handleChangeSelectedDate } from '../../../store/attendance'
import { dateToRequest } from '../../../utils/date-to-request'

export const DatePicker = () => {
    const { selectedDate } = useAppSelector(({ attendance }) => attendance)
    const { datePickerDaysOffset } = useAppSelector(({ system }) => system)

    const dispatch = useAppDispatch()

    const datesRow = useMemo(() => {
        if (selectedDate) {
            const now = new Date(selectedDate)

            const dates: Date[] = []

            const startIndex = 0 - datePickerDaysOffset
            const endIndex = datePickerDaysOffset + 1

            for (let i = startIndex; i < endIndex; i++) {
                const newDate = new Date(selectedDate)
                newDate.setDate(now.getDate() + i)
                dates.push(newDate)
            }

            return dates
        } else {
            const now = new Date()

            const formattedDate = dateToRequest(now)

            dispatch(handleChangeSelectedDate({
                selectedDate: formattedDate
            }))

            return []
        }
    }, [selectedDate, datePickerDaysOffset])

    const changeSelectedDate = (date: string) => {
        // Получаем дату без времени и таймзоны
        const dateObj = new Date(date);
        const dateWithoutTimezone = new Date(
            dateObj.getFullYear(),
            dateObj.getMonth(),
            dateObj.getDate()
        );

        const formattedDate = dateToRequest(dateWithoutTimezone)

        dispatch(handleChangeSelectedDate({
            selectedDate: formattedDate
        }))
    }

    return (
        <DateWrapper>
            {
                datesRow.map((date, index) => (
                    <DateItem onClick={() => changeSelectedDate(date.toString())} key={index} $isSelected={index === datePickerDaysOffset}>
                        <DateNumber>
                            {date.getDate()}
                        </DateNumber>
                        <Day>
                            {DAYS[date.getDay()]}
                        </Day>
                    </DateItem>
                ))
            }
        </DateWrapper>
    )
}