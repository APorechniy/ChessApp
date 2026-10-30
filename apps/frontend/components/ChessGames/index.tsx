import React from "react";
import { COLUMNS } from "../../content/chess-games-table-columns";
import { TableWrapper } from "./styled";
import { StyledTable } from "../../atoms/StyledTable";
import { Header } from "./Header";
import { useGetChessGamesQuery } from "../../store/chess-games/api";

export const ChessGamesTable = () => {
    const { data, isSuccess } = useGetChessGamesQuery();

    return (
        <TableWrapper>
            <Header />
            {
                (isSuccess && data?.chessGamesList) &&
                <StyledTable
                    columns={COLUMNS}
                    data={data.chessGamesList}
                    theme="dark"
                />
            }
        </TableWrapper>
    )
}