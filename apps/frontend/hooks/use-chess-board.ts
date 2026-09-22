import { useEffect, useRef, useState } from "react"
import { Chess, type Color, type Piece, type Square, type PieceSymbol } from 'chess.js';

export const useChessBoard = (fen?: string) => {
    const chessGameRef = useRef(new Chess('8/8/8/8/8/8/8/8 w - - 0 1', { skipValidation: true }));
    const chessGame = chessGameRef.current;

    const [squareWidth, setSquareWidth] = useState<number | null>(null);

    useEffect(() => {
        const square = document.querySelector(`[data-column="a"][data-row="1"]`)?.getBoundingClientRect();
        setSquareWidth(square?.width ?? null);
    }, []);

    useEffect(() => {
        if (fen) {
            chessGameRef.current = new Chess(fen)
        }
    }, [fen])

    const handlePieceDrop = ({ sourceSquare, targetSquare, piece }) => {
        const color = piece.pieceType[0] as Color;
        const type = piece.pieceType[1].toLowerCase() as PieceSymbol;

        try {
            if (!targetSquare) {
                chessGame.remove(sourceSquare as Square);

                return true
            } else {
                chessGame.put({
                    color: color as Color,
                    type: type as PieceSymbol
                }, targetSquare as Square);

                return true
            }
        } catch (e) {
            return false
        }
    }

    const handleChangeTurn = (turn: Color) => chessGame.setTurn(turn)

    return {
        chessPosition: chessGame.fen(),
        currentTurn: chessGame.turn(),
        handlePieceDrop,
        handleChangeTurn
    }
}