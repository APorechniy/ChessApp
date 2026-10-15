import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/store"
import { useEffect } from "react"
import { getChessOpenings } from "../../store/chess-openings/thunk/get-chess-openings";
import { COLUMNS } from "../../content/chess-openings-table-columns";
import { TableWrapper } from "./styled";
import { StyledTable } from "../../atoms/StyledTable";
import { Header } from "./Header";

export const ChessOpeningsTable = () => {
    const { chessOpeningsList, isLoadingChessOpenings } = useAppSelector(({ chessOpenings }) => chessOpenings);

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getChessOpenings())
    }, [dispatch])

    return (
        <TableWrapper>
            <Header />
            {
                isLoadingChessOpenings === 'SUCCESS' &&
                <StyledTable
                    columns={COLUMNS}
                    data={chessOpeningsList}
                    theme="dark"
                />
            }
        </TableWrapper>
    )
}