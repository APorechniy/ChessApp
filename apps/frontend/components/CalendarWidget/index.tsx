import React from "react";
import Calendar from 'react-calendar';
import { Wrapper } from "./styled";
import { useAppDispatch, useAppSelector } from "../../store/store";

import { handleChangeSelectedDate } from "../../store/attendance";
import { dateToRequest } from "../../utils/date-to-request";

export const CalendarWidget = () => {
    const { selectedDate } = useAppSelector(({ attendance }) => attendance)

    const dispatch = useAppDispatch()

    const onChangeDate = (value: Date) => {
        const dateWithoutTimezone = new Date(
            value.getFullYear(),
            value.getMonth(),
            value.getDate()
        );

        const formattedDate = dateToRequest(dateWithoutTimezone)

        dispatch(handleChangeSelectedDate({
            selectedDate: formattedDate
        }))
    }

    return (
        <Wrapper>
            <Calendar
                value={new Date(selectedDate)}
                onChange={onChangeDate}
            />
        </Wrapper>
    )
}