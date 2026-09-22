'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useAppSelector } from '../../store/store';
import { NotificationItem } from './Item';
import * as S from './styled';

export const NotificationManager: React.FC = () => {
    const [mounted, setMounted] = useState<boolean>(false);
    const { notifications } = useAppSelector(({ system }) => system);

    // Избегаем Hydration mismatch в Next.js (рендерим Portal только на клиенте)
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return createPortal(
        <S.PortalWrapper id="notification-portal-root">
            {notifications?.map((notification) => (
                <S.ItemWrapper key={notification.id}>
                    <NotificationItem notification={notification} />
                </S.ItemWrapper>
            ))}
        </S.PortalWrapper>,
        document.body
    );
};