import { useEffect, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "../store/store"
import { getAttendances } from "../store/attendance/thunk/get-attendances";
import { Attendance, PartialAttendance } from "../store/attendance/types";

type AnyAttendance = Attendance | PartialAttendance

export const useAttendances = () => {
    const { attendancesList, selectedDate } = useAppSelector(({ attendance }) => attendance);

    const dispatch = useAppDispatch();

    const loadAttendances = () => {
        dispatch(getAttendances({
            date: selectedDate,
        }))
    }

    useEffect(() => {
        loadAttendances()
    }, [selectedDate])

    const dateRangeCompare = (firstDateRange: [Date, Date], secondDateRange: [Date, Date]) => {
        return firstDateRange.some((f) => f >= secondDateRange[0] && f <= secondDateRange[1])
    }

    const attendanceTree: AnyAttendance[][] = useMemo(() => {
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
        }, [] as AnyAttendance[][])

        return tree
    }, [attendancesList])

    return attendanceTree
}