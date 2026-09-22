'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../../store/store';
import { removeNotification } from '../../../store/system';
import { type Notification } from '../../../store/system/types';
import * as S from './styled';

type NotificationItemProps = {
    notification: Notification;
};

export const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => {
    const dispatch = useAppDispatch();
    const { id, title, subtitle, variant } = notification;

    // 👈 Защита от null и undefined: гарантируем числовое значение
    const duration = notification.autoCloseTimer ?? 5000;

    const [isHovered, setIsHovered] = useState<boolean>(false);
    const remainingTimeRef = useRef<number>(duration);
    const startTimeRef = useRef<number | null>(null);

    // Прямое закрытие без useCallback (чтобы не пересоздавать функции)
    const handleClose = () => {
        dispatch(removeNotification(id));
    };

    useEffect(() => {
        // Если таймер отключен (<= 0), ничего не запускаем
        if (duration <= 0) return;

        let timerId: NodeJS.Timeout;

        if (!isHovered) {
            startTimeRef.current = Date.now();

            // Запускаем остаток времени
            timerId = setTimeout(() => {
                handleClose();
            }, remainingTimeRef.current);
        } else {
            // При наведении мыши вычисляем, сколько времени успело пройти
            if (startTimeRef.current !== null) {
                const elapsed = Date.now() - startTimeRef.current;
                remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed);
            }
        }

        return () => {
            if (timerId) clearTimeout(timerId);
        };
    }, [isHovered, duration]); // 👈 Убрали handleClose из зависимостей

    return (
        <S.NotificationCard
            $variant={variant}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            role="alert"
        >
            <S.ContentContainer>
                <S.Header>
                    <S.Badge $variant={variant}>{variant}</S.Badge>
                    <S.Title>{title}</S.Title>
                </S.Header>
                {subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}
            </S.ContentContainer>

            <S.CloseButton onClick={handleClose} aria-label="Close notification">
                &times;
            </S.CloseButton>

            {/* Показываем полоску только при реальном таймере */}
            {duration > 0 && (
                <S.ProgressBar
                    $variant={variant}
                    $duration={duration}
                    $isPaused={isHovered}
                />
            )}
        </S.NotificationCard>
    );
};