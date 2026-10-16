import React, { useEffect, useRef, useState } from 'react';
import { ChessboardProvider, Chessboard } from 'react-chessboard';
import { Square, Color, PieceSymbol } from 'chess.js';
import * as S from './styled';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { ChessTaskConstructorProps, PieceDropHandlerArgs } from './types';
import {
    createChessGame,
    EMPTY_FEN,
    START_FEN,
    updateFenTurn,
    getTurnFromFen,
} from './utils/chess-helpers';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getEditableTask } from '../../store/tasks/thunk/get-editable-task';
import { updateTask } from '../../store/tasks/thunk/update-task';
import { addNotification } from '../../store/system';
import { handleClearIsUpdatedTask } from '../../store/tasks';

export const ChessTaskConstructor: React.FC<ChessTaskConstructorProps> = ({
    taskId
}) => {
    const { editableTask, isLoadingEditableTask, isUpdatedTask } = useAppSelector(({ tasks }) => tasks)
    // 1. Храним шахматный движок в useRef
    const chessGameRef = useRef(createChessGame(EMPTY_FEN));
    const chessGame = chessGameRef.current;

    // 2. Локальный стейт позиции и очереди хода
    const [editedPosition, setEditedPosition] = useState<string | null>(null);

    const chessPosition = editedPosition ?? editableTask?.position ?? EMPTY_FEN;
    const currentTurn = getTurnFromFen(chessPosition);

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (taskId) {
            dispatch(getEditableTask({ taskId: taskId }))
        }
    }, [taskId])

    useEffect(() => {
        chessGameRef.current = createChessGame(chessPosition);
    }, [chessPosition]);

    useEffect(() => {
        if (isUpdatedTask === "ERROR") {
            dispatch(addNotification({
                title: 'Ошибка при сохранении позиции',
                subtitle: 'Повторите позднее.',
                variant: 'error',
                autoCloseTimer: 5000,
            }))
        }

        if (isUpdatedTask === "SUCCESS") {
            dispatch(addNotification({
                title: 'Позиция успешно сохранена',
                variant: 'success',
                autoCloseTimer: 5000,
            }))
            dispatch(handleClearIsUpdatedTask())
        }
    }, [isUpdatedTask])

    // Обработчик перетаскивания и сброса фигур
    const handlePieceDrop = ({ sourceSquare, targetSquare, piece }: PieceDropHandlerArgs) => {
        const color = piece.pieceType[0] as Color;
        const type = piece.pieceType[1].toLowerCase() as PieceSymbol;

        // Сброс фигуры за пределы доски -> удаление
        if (!targetSquare) {
            chessGame.remove(sourceSquare as Square);
            setEditedPosition(chessGame.fen());
            return true;
        }

        // Если фигура перемещается по доске (не из запаса)
        if (!piece.isSparePiece) {
            chessGame.remove(sourceSquare as Square);
        }

        // Размещение фигуры на целевой клетке
        const success = chessGame.put(
            { color, type },
            targetSquare as Square
        );

        if (!success) {
            alert(`Доска уже содержит ${color === 'w' ? 'белого' : 'черного'} Короля`);
            return false;
        }

        setEditedPosition(chessGame.fen());
        return true;
    };

    // Очистка всей доски
    const handleClear = () => {
        chessGame.load(EMPTY_FEN, { skipValidation: true });
        setEditedPosition(chessGame.fen());
    };

    // Сброс к начальной шахматной позиции
    const handleResetToStart = () => {
        chessGame.load(START_FEN, { skipValidation: true });
        setEditedPosition(chessGame.fen());
    };

    // Переключение очереди хода (Белые / Черные)
    const handleTurnChange = (newTurn: Color) => {
        const updatedFen = updateFenTurn(chessPosition, newTurn);
        chessGame.load(updatedFen, { skipValidation: true });
        setEditedPosition(chessGame.fen());
    };

    // Ручное изменение FEN в текстовом поле
    const handleFenChange = (newFen: string) => {
        setEditedPosition(newFen);
        try {
            chessGame.load(newFen, { skipValidation: true });
        } catch {
            // Игнорируем промежуточный невалидный FEN
        }
    };

    // Мок-сохранение в БД
    const handleSave = async () => {
        await dispatch(updateTask({
            task: {
                ...editableTask,
                position: chessPosition
            }
        }))


        setEditedPosition(null);
    };

    return (
        <ChessboardProvider
            options={{
                position: chessPosition,
                onPieceDrop: handlePieceDrop,
                id: 'chess-task-constructor',
            }}
        >
            <S.Container>
                {/* Шапка */}
                <Header
                    onClear={handleClear}
                    onResetToStart={handleResetToStart}
                    onSave={handleSave}
                    isDisabledButton={chessPosition === editableTask?.position}
                    taskName={editableTask?.name || ""}
                />

                {/* Сетка Конструктора */}
                <S.MainGrid>
                    {/* Шахматная доска */}
                    <S.BoardWrapper>
                        <S.BoardInner>
                            <Chessboard
                                options={{
                                    boardStyle: {
                                        borderRadius: '12px',
                                        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                                    }
                                }}
                            />
                        </S.BoardInner>
                    </S.BoardWrapper>

                    {/* Боковая панель */}
                    <Sidebar
                        turn={currentTurn}
                        fenString={chessPosition}
                        onTurnChange={handleTurnChange}
                        onFenChange={handleFenChange}
                    />
                </S.MainGrid>
            </S.Container>
        </ChessboardProvider>
    );
};