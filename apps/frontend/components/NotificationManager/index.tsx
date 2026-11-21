'use client';

import React, { useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { useAppSelector } from '../../store/store';
import { NotificationItem } from './Item';
import * as S from './styled';

const emptySubscribe = () => () => { };

export const NotificationManager: React.FC = () => {
    const mounted = useSyncExternalStore(
        emptySubscribe,
        () => true,   // client snapshot
        () => false   // server snapshot
    );
    const { notifications } = useAppSelector(({ system }) => system);

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