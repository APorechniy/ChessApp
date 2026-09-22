import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/store"
import { useEffect } from "react"
import { createTheme } from 'react-data-table-component';
import { COLUMNS } from "../../content/chess-games-table-columns";
import { TableWrapper } from "./styled";
import { StyledTable } from "../../atoms/StyledTable";
import { Header } from "./Header";
import { getChessGames } from "../../store/chess-games/thunk/get-chess-games";

export const ChessGamesTable = () => {
    const { chessGamesList, isLoadingChessGamesList } = useAppSelector(({ chessGames }) => chessGames);

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
        dispatch(getChessGames({}))
    }, [dispatch])

    return (
        <TableWrapper>
            <Header />
            {
                isLoadingChessGamesList === 'SUCCESS' &&
                <StyledTable
                    columns={COLUMNS}
                    data={chessGamesList}
                    theme="dark"
                />
            }
        </TableWrapper>
    )
}