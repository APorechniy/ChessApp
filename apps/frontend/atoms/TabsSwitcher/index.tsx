import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import * as S from './styled';

export interface Tab {
    id: string | number;
    title: string;
    content: React.ReactNode;
    icon?: React.ReactNode;
}

interface TabsSwitcherProps {
    tabs: Tab[];
    defaultTabId?: string | number;
    align?: S.Alignment;
    className?: string;
    onChange?: (id: string | number) => void;
}

export const TabsSwitcher: React.FC<TabsSwitcherProps> = ({
    tabs,
    defaultTabId,
    align = 'left',
    className,
    onChange,
}) => {
    const [activeTabId, setActiveTabId] = useState<string | number>(
        defaultTabId || tabs[0]?.id || 0
    );

    const activeTab = tabs.find((tab) => tab.id === activeTabId) || tabs[0];

    const handleTabClick = (id: string | number) => {
        setActiveTabId(id);
        if (onChange) onChange(id);
    };

    return (
        <S.Container className={className}>
            <S.Header $align={align}>
                {tabs.map((tab) => {
                    const isActive = tab.id === activeTabId;

                    return (
                        <S.TabButton
                            key={tab.id}
                            $isActive={isActive}
                            onClick={() => handleTabClick(tab.id)}
                        >
                            {tab.icon && <S.TabIcon>{tab.icon}</S.TabIcon>}
                            <S.TabText>{tab.title}</S.TabText>

                            {/* Фоновая плашка активного таба */}
                            {isActive && (
                                <S.ActiveHighlight
                                    layoutId="active-tab-highlight"
                                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                                />
                            )}

                            {/* Нижняя полоса активного таба */}
                            {isActive && (
                                <S.ActiveBorder
                                    layoutId="active-tab-border"
                                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                                />
                            )}
                        </S.TabButton>
                    );
                })}
            </S.Header>

            {/* Контент активного таба */}
            <S.ContentContainer>
                <AnimatePresence mode="wait">
                    <S.AnimatedContent
                        key={activeTabId}
                        initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                        {activeTab?.content}
                    </S.AnimatedContent>
                </AnimatePresence>
            </S.ContentContainer>
        </S.Container>
    );
};