import { useEffect, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "../store/store"
import { getAttendances } from "../store/attendance/thunk/get-attendances";
import { Attendance } from "../store/attendance/types";

export const useAttendances = () => {
    const { attendancesList, selectedDate } = useAppSelector(({ attendance }) => attendance);

    const dispatch = useAppDispatch();

    useEffect(() => {
        loadAttendances()
    }, [selectedDate])

    const loadAttendances = () => {
        dispatch(getAttendances({
            date: selectedDate,
        }))
    }

    const dateRangeCompare = (firstDateRange: [Date, Date], secondDateRange: [Date, Date]) => {
        return firstDateRange.some((f) => f >= secondDateRange[0] && f <= secondDateRange[1])
    }

    const attendanceTree: Attendance[][] = useMemo(() => {
        const tree = attendancesList.reduce((prev, current) => {
            let hasItem = 1;
            let i = 0;

            while (hasItem) {
                if (!prev[i]) {
                    prev.push([current])
                    hasItem = 0
                }

                const hasRangeConflict = prev[i].some((att) => dateRangeCompare(
                    [new Date(current.startDate), new Date(current.endDate)],
                    [new Date(att.startDate), new Date(att.endDate)]
                ))

                if (!hasRangeConflict) {
                    prev[i].push(current);
                    hasItem = 0;
                } else {
                    i++;
                }
            }

            return [...prev]
        }, [])

        return tree
    }, [attendancesList])

    return attendanceTree
}