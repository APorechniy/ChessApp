import React, { FC, useEffect, useRef, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess, Square } from "chess.js";
import * as S from "./styled";

interface SolverBoardProps {
    initialFen: string;
    onPositionChange: (newFen: string, moves: string[]) => void;
    resetSignal: number;
}

export const SolverBoard: FC<SolverBoardProps> = ({
    initialFen,
    onPositionChange,
    resetSignal,
}) => {
    const chessRef = useRef(new Chess(initialFen, { skipValidation: true }));
    const [currentFen, setCurrentFen] = useState<string>(() => {
        try {
            return new Chess(initialFen).fen();
        } catch {
            return new Chess().fen();
        }
    });

    const handlePieceDrop = ({
        sourceSquare,
        targetSquare,
    }: {
        sourceSquare: string;
        targetSquare: string | null;
    }) => {
        if (!targetSquare) return false;

        try {
            const move = chessRef.current.move({
                from: sourceSquare as Square,
                to: targetSquare as Square,
                promotion: "q",
            });

            if (!move) return false;

            const updatedFen = chessRef.current.fen();
            const updatedMoves = chessRef.current.history();

            setCurrentFen(updatedFen);
            onPositionChange(updatedFen, updatedMoves);
            return true;
        } catch {
            return false;
        }
    };

    const boardOrientation = initialFen.includes(" b ") ? "black" : "white";

    return (
        <S.BoardWrapper>
            <S.BoardContainer>
                <Chessboard
                    options={{
                        position: currentFen,
                        boardOrientation,
                        onPieceDrop: handlePieceDrop,
                        id: "homework-solver-board",
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