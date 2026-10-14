import { createAppColumnHelper } from '../atoms/StyledTable/Features/features';
import { type StudentsGroup } from "../store/students-groups/types";

const columnHelper = createAppColumnHelper<StudentsGroup>()

export const COLUMNS = columnHelper.columns([
    columnHelper.accessor("name", {
        header: 'Имя',
        cell: info => info.getValue(),
    })
])