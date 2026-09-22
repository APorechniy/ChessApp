import { type TableColumn } from "react-data-table-component";
import { type Student } from "../store/students/types";

const DEFAULT_COLUMNS: TableColumn<Student>[] = [
    {
        name: 'Имя',
        width: '20rem',
        sortable: true,
        sortFunction: (a: Student, b: Student) => {
            // Сортировка без учета регистра
            return a.lastName.localeCompare(b.lastName, 'ru', { sensitivity: 'base' });
        },
        selector: row => `${row.lastName} ${row.firstName}`,
    },
    {
        name: 'Дата рождения',
        width: "15rem",
        sortable: true,
        sortFunction: (a: Student, b: Student) => {
            // Сортировка по дате
            return new Date(a?.birthDate).getTime() - new Date(b?.birthDate).getTime();
        },
        selector: row => row?.birthDate ? new Date(row.birthDate).toLocaleDateString() : "-",
    },
    {
        name: 'ФШР ID',
        width: '10rem',
        cell: row => (
            row.fshrId ?
                <a href={`https://ratings.ruchess.ru/people/${row.fshrId}`} target="_blank">
                    {row.fshrId}
                </a>
                :
                "-"
        )
    },
    {
        name: 'ФИДЕ ID',
        width: '10rem',
        cell: row => (
            row.fideId ?
                <a href={`https://ratings.fide.com/profile/${row.fideId}`} target="_blank">
                    {row.fideId}
                </a>
                :
                "-"
        )
    },
    {
        name: 'Телефон',
        sortable: true,
        maxWidth: "15rem",
        selector: row => row.phone,
    },
    {
        name: 'Заметки',
        width: "30rem",
        cell: (row) => (
            <div style={{ width: '100%', height: 'auto', wordBreak: "break-all", textAlign: "left" }}>
                {row.notes || "-"}
            </div>
        )
    },
]

const EXTRA_COLUMNS: TableColumn<Student>[] = [
    {
        name: 'Баланс',
        sortable: true,
        width: '10rem',
        selector: row => `${row.balance} ₽`,
    },
]

export const getColumns = (isExtra = false) => {
    let columns = [...DEFAULT_COLUMNS]

    if (isExtra) {
        columns = [...DEFAULT_COLUMNS, ...EXTRA_COLUMNS]
    }

    return columns
}