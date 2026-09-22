import { type TableColumn } from "react-data-table-component";
import type { ChessOpening } from "../store/chess-openings/types";

export const COLUMNS: TableColumn<ChessOpening>[] = [
    {
        name: 'Название дебюта',
        selector: row => row.name,
    },
]