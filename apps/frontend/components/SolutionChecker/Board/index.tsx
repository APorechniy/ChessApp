import React, { FC, useMemo } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import * as S from "./styled";

interface BoardProps {
    initialFen: string;
}

export const Board: FC<BoardProps> = ({
    initialFen,
}) => {
    const currentFen = useMemo(() => {
        try {
            return new Chess(initialFen).fen();
        } catch {
            return new Chess().fen();
        }
    }, [initialFen]);

    const boardOrientation = initialFen.includes(" b ") ? "black" : "white";

    return (
        <S.BoardWrapper>
            <S.BoardContainer>
                <Chessboard
                    options={{
                        position: currentFen,
                        boardOrientation,
                        id: "homework-solution-board",
                        boardStyle: {
                            borderRadius: "1rem",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                        },
                    }}
                />
            </S.BoardContainer>
        </S.BoardWrapper>
    );
};