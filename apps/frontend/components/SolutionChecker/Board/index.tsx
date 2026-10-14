import React, { FC, useEffect, useRef, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess, Square } from "chess.js";
import * as S from "./styled";

interface BoardProps {
    initialFen: string;
}

export const Board: FC<BoardProps> = ({
    initialFen,
}) => {
    const chessRef = useRef(new Chess(initialFen));
    const [currentFen, setCurrentFen] = useState<string>(initialFen);

    useEffect(() => {
        try {
            chessRef.current = new Chess(initialFen);
            setCurrentFen(initialFen);
        } catch {
            chessRef.current = new Chess();
            setCurrentFen(chessRef.current.fen());
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