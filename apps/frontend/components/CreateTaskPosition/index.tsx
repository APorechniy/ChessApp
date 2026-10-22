import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
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
    const { editableTask, isUpdatedTask } = useAppSelector(({ tasks }) => tasks);

    // 1. Шахматный движок в useRef
    const chessGameRef = useRef(createChessGame(EMPTY_FEN));

    // 2. Локальный стейт позиции
    const [editedPosition, setEditedPosition] = useState<string | null>();

    const chessPosition = editedPosition ?? editableTask?.position ?? EMPTY_FEN;
    const currentTurn = getTurnFromFen(chessPosition);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (taskId) {
            dispatch(getEditableTask({ taskId }));
        }
    }, [taskId, dispatch]);

    // Синхронизация движка с FEN без падений на промежуточных/невалидных позициях
    useEffect(() => {
        try {
            chessGameRef.current.load(chessPosition, { skipValidation: true });
        } catch {
            chessGameRef.current = createChessGame(chessPosition);
        }
    }, [chessPosition]);

    useEffect(() => {
        if (isUpdatedTask === "ERROR") {
            dispatch(addNotification({
                title: 'Ошибка при сохранении позиции',
                subtitle: 'Повторите позднее.',
                variant: 'error',
                autoCloseTimer: 5000,
            }));
        }

        if (isUpdatedTask === "SUCCESS") {
            dispatch(addNotification({
                title: 'Позиция успешно сохранена',
                variant: 'success',
                autoCloseTimer: 5000,
            }));
            dispatch(handleClearIsUpdatedTask());
        }
    }, [isUpdatedTask, dispatch]);

    // Обработчик перетаскивания и сброса фигур
    const handlePieceDrop = useCallback(({ sourceSquare, targetSquare, piece }: PieceDropHandlerArgs): boolean => {
        const game = chessGameRef.current;

        // Если бросили на ту же клетку — ничего не меняем
        if (sourceSquare && targetSquare && sourceSquare === targetSquare) {
            return true;
        }

        const color = piece.pieceType[0] as Color;
        const type = piece.pieceType[1].toLowerCase() as PieceSymbol;

        // 1. Сброс за пределы доски -> удаление фигуры
        if (!targetSquare) {
            if (!piece.isSparePiece && sourceSquare) {
                game.remove(sourceSquare as Square);
                setEditedPosition(game.fen());
            }
            return true;
        }

        // Сохраняем исходные фигуры на случай отката (если put завершится неудачей)
        const prevSourcePiece = !piece.isSparePiece && sourceSquare
            ? game.get(sourceSquare as Square)
            : null;
        const prevTargetPiece = game.get(targetSquare as Square);

        // 2. Если фигура перемещается по доске — удаляем с исходной клетки
        if (!piece.isSparePiece && sourceSquare) {
            game.remove(sourceSquare as Square);
        }

        // 3. Если на целевой клетке уже стояла фигура — удаляем её перед put,
        // чтобы chess.js не блокировал перезапись (особенно если там стоял король)
        if (prevTargetPiece) {
            game.remove(targetSquare as Square);
        }

        // 4. Размещение фигуры на целевой клетке
        const success = game.put(
            { color, type },
            targetSquare as Square
        );

        if (!success) {
            // Восстанавливаем состояние клеток при ошибке
            if (prevSourcePiece && sourceSquare) {
                game.put(prevSourcePiece, sourceSquare as Square);
            }
            if (prevTargetPiece) {
                game.put(prevTargetPiece, targetSquare as Square);
            }

            alert(`Доска уже содержит ${color === 'w' ? 'белого' : 'черного'} Короля`);
            return false;
        }

        setEditedPosition(game.fen());
        return true;
    }, []);

    // Очистка всей доски
    const handleClear = () => {
        const game = chessGameRef.current;
        game.load(EMPTY_FEN, { skipValidation: true });
        setEditedPosition(game.fen());
    };

    // Сброс к начальной шахматной позиции
    const handleResetToStart = () => {
        const game = chessGameRef.current;
        game.load(START_FEN, { skipValidation: true });
        setEditedPosition(game.fen());
    };

    // Переключение очереди хода (Белые / Черные)
    const handleTurnChange = (newTurn: Color) => {
        const game = chessGameRef.current;
        const updatedFen = updateFenTurn(chessPosition, newTurn);
        game.load(updatedFen, { skipValidation: true });
        setEditedPosition(game.fen());
    };

    // Ручное изменение FEN в текстовом поле
    const handleFenChange = (newFen: string) => {
        setEditedPosition(newFen);
        try {
            chessGameRef.current.load(newFen, { skipValidation: true });
        } catch {
            // Игнорируем промежуточный невалидный ввод
        }
    };

    // Сохранение в БД
    const handleSave = async () => {
        await dispatch(updateTask({
            task: {
                ...editableTask,
                position: chessPosition
            }
        }));
    };

    // Мемоизируем опции провайдера, чтобы избежать рассинхронизации и лишних сбросов доски
    const providerOptions = useMemo(() => ({
        position: chessPosition,
        onPieceDrop: handlePieceDrop,
        id: 'chess-task-constructor',
    }), [chessPosition, handlePieceDrop]);

    return (
        <ChessboardProvider options={providerOptions}>
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