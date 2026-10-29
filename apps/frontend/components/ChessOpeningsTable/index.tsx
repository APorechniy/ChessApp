import React from "react";
import { COLUMNS } from "../../content/chess-openings-table-columns";
import { TableWrapper } from "./styled";
import { StyledTable } from "../../atoms/StyledTable";
import { Header } from "./Header";
import { useGetChessOpeningsQuery } from "store/chess-openings/api";

export const ChessOpeningsTable = () => {
    const { data, isSuccess } = useGetChessOpeningsQuery();

    return (
        <TableWrapper>
            <Header />
            {
                isSuccess &&
                <StyledTable
                    columns={COLUMNS}
                    data={data?.chessOpeningsList}
                    theme="dark"
                />
            }
        </TableWrapper>
    )
}