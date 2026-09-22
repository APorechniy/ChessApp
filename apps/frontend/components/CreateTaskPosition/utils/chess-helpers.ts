import { Chess } from 'chess.js';
import { Color } from '../types';

export const EMPTY_FEN = '8/8/8/8/8/8/8/8 w - - 0 1';
export const START_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export const WHITE_PIECES = ['wK', 'wQ', 'wR', 'wB', 'wN', 'wP'];
export const BLACK_PIECES = ['bK', 'bQ', 'bR', 'bB', 'bN', 'bP'];

/**
 * Инициализирует экземпляр шахматного движка без валидации ходов
 */
export const createChessGame = (fen?: string): Chess => {
    const validFen = fen && fen.trim().length > 0 ? fen : EMPTY_FEN;
    return new Chess(validFen, { skipValidation: true });
};

/**
 * Изменяет очередность хода в FEN нотации
 */
export const updateFenTurn = (fen: string, newTurn: Color): string => {
    const parts = fen.trim().split(' ');
    if (parts.length < 2) return fen;
    parts[1] = newTurn;
    return parts.join(' ');
};

/**
 * Извлекает чей сейчас ход из FEN
 */
export const getTurnFromFen = (fen: string): Color => {
    if (!fen) {
        return "b"
    }
    const parts = fen.trim().split(' ');
    return parts[1] === 'b' ? 'b' : 'w';
};