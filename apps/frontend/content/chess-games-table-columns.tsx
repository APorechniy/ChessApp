import type { TableColumn } from "react-data-table-component";
import type { ChessGame } from "../store/chess-games/types";

export const COLUMNS: TableColumn<ChessGame>[] = [
    {
        name: 'Белые',
        selector: row => row.whitePlayer,
    },
    {
        name: 'Черные',
        selector: row => row.blackPlayer,
    },
    {
        name: 'Дата',
        selector: row => `${new Date(row.year).toLocaleDateString()} г.`,
    },
    {
        name: 'Дебют',
        selector: row => row.chessOpening.name
    }
]