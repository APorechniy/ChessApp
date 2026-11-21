import { createAppColumnHelper } from '../atoms/StyledTable/Features/features';
import type { ChessGame } from "../store/chess-games/types";

const columnHelper = createAppColumnHelper<ChessGame>();

export const COLUMNS = columnHelper.columns([
    columnHelper.accessor("whitePlayer", {
        header: "Белые",
        cell: (info) => info.getValue()
    }),
    columnHelper.accessor("blackPlayer", {
        header: "Черные",
        cell: (info) => info.getValue()
    }),
    columnHelper.accessor("year", {
        header: "Дата",
        cell: (info) => `${new Date(info.getValue()).toLocaleDateString()} г.`
    }),
    columnHelper.accessor("chessOpening", {
        header: "Дебют",
        cell: (info) => info.getValue()?.name
    }),
])