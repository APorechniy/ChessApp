import { type ColumnDef } from '@tanstack/react-table';
import { type AppTableFeatures, createAppColumnHelper } from '../atoms/StyledTable/Features/features';
import { type Student } from "../store/students/types";

const columnHelper = createAppColumnHelper<Student>()

const DEFAULT_COLUMNS = columnHelper.columns([
    columnHelper.display({
        id: "name",
        header: 'Имя',
        cell: ({ row }) => `${row.original.lastName} ${row.original.firstName}`,
    }),
    columnHelper.display({
        id: "birthdate",
        header: 'Дата рождения',
        cell: ({ row }) => row?.original?.birthDate ? new Date(row.original.birthDate).toLocaleDateString() : "-",
    }),
    columnHelper.display({
        id: "fshr",
        header: 'ФШР ID',
        cell: ({ row }) => (
            row.original.fshrId ?
                <a href={`https://ratings.ruchess.ru/people/${row.original.fshrId}`} target="_blank">
                    {row.original.fshrId}
                </a>
                :
                "-"
        ),
    }),
    columnHelper.display({
        id: "fide",
        header: 'ФИДЕ ID',
        cell: ({ row }) => (
            row.original.fideId ?
                <a href={`https://ratings.fide.com/profile/${row.original.fideId}`} target="_blank">
                    {row.original.fideId}
                </a>
                :
                "-"
        ),
    }),
    columnHelper.accessor("phone", {
        id: "phone",
        header: 'Телефон',
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("notes", {
        id: "notes",
        header: 'Заметки',
        cell: (info) => (
            <div style={{ width: '100%', height: 'auto', wordBreak: "break-all", textAlign: "left" }}>
                {info.getValue() || "-"}
            </div>
        ),
    })
])

const EXTRA_COLUMNS = columnHelper.columns([
    columnHelper.accessor("balance", {
        id: "balance",
        header: 'Баланс',
        cell: info => `${info.getValue()} ₽`,
    })
])

export const getColumns = (isExtra = false): ColumnDef<AppTableFeatures, Student, unknown>[] => {
    let columns = [...DEFAULT_COLUMNS]

    if (isExtra) {
        columns = [...DEFAULT_COLUMNS, ...EXTRA_COLUMNS]
    }

    return columns
}