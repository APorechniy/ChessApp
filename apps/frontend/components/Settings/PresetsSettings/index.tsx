import React, { useEffect } from "react";
import { Wrapper } from "./styled";
import { createTheme } from 'react-data-table-component';
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { getAttendancePresets } from "../../../store/attendance-presets/thunk/get-attendance-presets";
import { Header } from "./Header";
import { StyledTable } from "../../../atoms/StyledTable";
import { COLUMNS } from "../../../content/attendance-presets-table-columns";
import { type AttendancePreset } from "../../../store/attendance-presets/types";
import { handleChangeCurrentAttendancePreset } from "../../../store/attendance-presets";
import { handleOpenModal } from "../../../store/system";

export const PresetsSettings = () => {
    const {
        attendancePresetsList,
        attendancePresetsListLoading
    } = useAppSelector(({ attendancePresets }) => attendancePresets)
    const dispatch = useAppDispatch()

    createTheme('dark', {
        text: {
            primary: 'var(--primary-text)'
        },
        background: {
            default: 'var(--primary-background)'
        }
    })

    useEffect(() => {
        dispatch(getAttendancePresets())
    }, [dispatch])

    const handleOpenDetailPresetModal = (attendancePreset: AttendancePreset) => {
        dispatch(handleChangeCurrentAttendancePreset({
            attendancePreset: attendancePreset
        }))
        dispatch(handleOpenModal({
            modalContent: "DETAIL_PRESET"
        }))
    }

    return (
        <Wrapper>
            <Header />
            {
                attendancePresetsListLoading === "SUCCESS" &&
                <StyledTable
                    columns={COLUMNS}
                    data={attendancePresetsList}
                    theme="dark"
                    onRowClicked={handleOpenDetailPresetModal}
                />
            }
        </Wrapper>
    )
}