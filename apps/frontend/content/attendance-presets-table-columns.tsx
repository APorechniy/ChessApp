import type { TableColumn } from "react-data-table-component";
import type { AttendancePreset } from "../store/attendance-presets/types";
import { convertTimeBetweenTimezones } from "../utils/time/convert-timezone";
import { RRULE_DAYS } from "./calendar";

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const COLUMNS: TableColumn<AttendancePreset>[] = [
    {
        name: 'Студент',
        selector: row => row.student ? `${row.student.lastName} ${row.student.firstName}` : "-",
    },
    {
        name: 'Группа учеников',
        selector: row => row.group ? row.group.name : "-",
    },
    {
        name: 'Начало занятия',
        selector: row => convertTimeBetweenTimezones(row.startTimeLocal, row.timezone, timezone)
    },
    {
        name: 'Окончание занятия',
        selector: row => convertTimeBetweenTimezones(row.endTimeLocal, row.timezone, timezone)
    },
    {
        name: 'Дни занятий',
        selector: row => row.rrule.split("=").pop().split(',').reduce((prev, curr, index) => `${prev}${Boolean(index) ? ',' : ''} ${RRULE_DAYS.find(rrd => rrd.rrule === curr).name}`, "")
    }
]