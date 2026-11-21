import { useEffect, useRef, useState } from "react"
import { Chess, type PieceSymbol, type Color, type Square } from 'chess.js';
import { type DraggingPieceDataType } from "react-chessboard";

type THandlePieceDrop = {
    sourceSquare: Square,
    targetSquare: Square,
    piece: DraggingPieceDataType
}

const INITIAL_FEN = '8/8/8/8/8/8/8/8 w - - 0 1'
const initialGame = new Chess(INITIAL_FEN, { skipValidation: true })

export const useChessBoard = (fen?: string) => {
    const chessGameRef = useRef(new Chess(INITIAL_FEN, { skipValidation: true }));
    const [chessPosition, setChessPosition] = useState(initialGame.fen())
    const [currentTurn, setCurrentTurn] = useState(initialGame.fen())

    const syncState = () => {
        setChessPosition(chessGameRef.current.fen())
        setCurrentTurn(chessGameRef.current.turn())
    }

    useEffect(() => {
        if (fen) {
            chessGameRef.current = new Chess(fen)
            syncState()
        }
    }, [fen])

    const handlePieceDrop = ({ sourceSquare, targetSquare, piece }: THandlePieceDrop) => {
        const chessGame = chessGameRef.current
        const color = piece.pieceType[0] as Color
        const type = piece.pieceType[1].toLowerCase() as PieceSymbol

        try {
            if (!targetSquare) {
                chessGame.remove(sourceSquare)
            } else {
                chessGame.put({ color, type }, targetSquare)
            }
            syncState()
            return true
        } catch (e) {
            return false
        }
    }

    const handleChangeTurn = (turn: Color) => {
        chessGameRef.current.setTurn(turn)
        syncState()
    }

    return {
        chessPosition: chessPosition,
        currentTurn: currentTurn,
        handlePieceDrop,
        handleChangeTurn
    }
}