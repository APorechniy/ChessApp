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
    const chessRef = useRef<Chess | null>(null);
    const [currentFen, setCurrentFen] = useState<string>(initialFen);

    // Синхронизация при смене задачи / сбросе — как в конструкторе
    useEffect(() => {
        try {
            if (chessRef.current) {
                chessRef.current.load(initialFen, { skipValidation: true });
            } else {
                chessRef.current = new Chess(initialFen, { skipValidation: true });
            }
            // ВАЖНО: не берём chessRef.current.fen() — оставляем сырой FEN
            setCurrentFen(initialFen);
        } catch {
            setCurrentFen(initialFen); // даже если chess.js не смог — доска отрисует
            chessRef.current = null;
        }
    }, [initialFen, resetSignal]);

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