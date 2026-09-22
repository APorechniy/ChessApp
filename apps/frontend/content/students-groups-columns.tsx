import { type TableColumn } from "react-data-table-component";
import { type StudentsGroup } from "../store/students-groups/types";

export const COLUMNS: TableColumn<StudentsGroup>[] = [
    {
        name: 'Имя',
        sortable: true,
        selector: row => row.name,
    },
]