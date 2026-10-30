import { createAppColumnHelper } from '../atoms/StyledTable/Features/features';
import type { ChessOpening } from "../store/chess-openings/types";

const columnHelper = createAppColumnHelper<ChessOpening>()

export const COLUMNS = columnHelper.columns([
    columnHelper.accessor("name", {
        header: 'Название дебюта',
        cell: (info) => info.getValue(),
    }),
])