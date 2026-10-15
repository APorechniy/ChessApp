import { createAppColumnHelper } from '../atoms/StyledTable/Features/features';
import { type User } from "../store/users/types";

const columnHelper = createAppColumnHelper<User>()

export const COLUMNS = columnHelper.columns([
    columnHelper.display({
        id: "name",
        header: 'Имя',
        cell: ({ row }) => `${row.original?.userData?.lastName} ${row.original?.userData?.firstName}`,
    }),
    // {
    //     name: 'Дата рождения',
    //     width: "15rem",
    //     sortable: true,
    //     sortFunction: (a: Student, b: Student) => {
    //         // Сортировка по дате
    //         return new Date(a?.birthDate).getTime() - new Date(b?.birthDate).getTime();
    //     },
    //     selector: row => row?.birthDate ? new Date(row.birthDate).toLocaleDateString() : "-",
    // },
    // {
    //     name: 'ФШР ID',
    //     width: '10rem',
    //     cell: row => (
    //         row.fshrId ?
    //             <a href={`https://ratings.ruchess.ru/people/${row.fshrId}`} target="_blank">
    //                 {row.fshrId}
    //             </a>
    //             :
    //             "-"
    //     )
    // },
    // {
    //     name: 'ФИДЕ ID',
    //     width: '10rem',
    //     cell: row => (
    //         row.fideId ?
    //             <a href={`https://ratings.fide.com/profile/${row.fideId}`} target="_blank">
    //                 {row.fideId}
    //             </a>
    //             :
    //             "-"
    //     )
    // },
    // {
    //     name: 'Телефон',
    //     sortable: true,
    //     maxWidth: "15rem",
    //     selector: row => row.phone,
    // },
    // {
    //     name: 'Заметки',
    //     width: "30rem",
    //     cell: (row) => (
    //         <div style={{ width: '100%', height: 'auto', wordBreak: "break-all", textAlign: "left" }}>
    //             {row.notes || "-"}
    //         </div>
    //     )
    // },
])