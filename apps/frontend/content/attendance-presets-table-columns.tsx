import { createAppColumnHelper } from '../atoms/StyledTable/Features/features';
import type { AttendancePreset } from "../store/attendance-presets/types";
import { convertTimeBetweenTimezones } from "../utils/time/convert-timezone";
import { RRULE_DAYS } from "./calendar";

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const columnHelper = createAppColumnHelper<AttendancePreset>();

export const COLUMNS = columnHelper.columns([
    columnHelper.accessor("student", {
        header: "Студент",
        cell: (info) => `${info.getValue()?.lastName} ${info.getValue()?.firstName}`
    }),
    columnHelper.accessor("group", {
        header: "Группа учеников",
        cell: (info) => info.getValue() ? info.getValue()?.name : "-"
    }),
    columnHelper.display({
        id: "startTimeLocal",
        header: "Начало занятия",
        cell: ({ row }) => convertTimeBetweenTimezones(row.original?.startTimeLocal, row.original?.timezone, timezone)
    }),
    columnHelper.display({
        id: "endTimeLocal",
        header: "Начало занятия",
        cell: ({ row }) => convertTimeBetweenTimezones(row.original?.endTimeLocal, row.original?.timezone, timezone)
    }),
    columnHelper.accessor("rrule", {
        header: "Дни занятий",
        cell: (info) => info.getValue()?.split("=")?.pop()?.split(',').reduce((prev, curr, index) => `${prev}${Boolean(index) ? ',' : ''} ${RRULE_DAYS.find(rrd => rrd.rrule === curr).name}`, "")
    }),
])