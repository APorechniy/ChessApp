import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/store"
import { useEffect } from "react"
import { getChessOpenings } from "../../store/chess-openings/thunk/get-chess-openings";
import { createTheme } from 'react-data-table-component';
import { COLUMNS } from "../../content/chess-openings-table-columns";
import { TableWrapper } from "./styled";
import { StyledTable } from "../../atoms/StyledTable";
import { Header } from "./Header";

export const ChessOpeningsTable = () => {
    const { chessOpeningsList, isLoadingChessOpenings } = useAppSelector(({ chessOpenings }) => chessOpenings);

    createTheme('dark', {
        text: {
            primary: 'var(--primary-text)'
        },
        background: {
            default: 'var(--primary-background)'
        }
    })

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