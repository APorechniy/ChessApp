import React from 'react';
import styled from 'styled-components';
import { type ColumnDef } from '@tanstack/react-table';
import { createAppColumnHelper, type AppTableFeatures } from '../atoms/StyledTable/Features/features';
import type { Task } from '../store/tasks/types';
import { TextButton } from '../atoms/TextButton';
import { IconButton } from '../atoms/IconButton';
import { PlusIcon } from '../assets/Plus';

// Стилизованные элементы для чистоты декларации ячеек
const CenteredCell = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const QualityBadge = styled.div<{ $color: string }>`
    width: 0.8rem;
    height: 0.8rem;
    margin-left: 1rem;
    background-color: ${({ $color }) => $color};
    border: 0.1rem solid black;
    border-radius: 2px;
`;

const columnHelper = createAppColumnHelper<Task>();

// Базовые колонки для всех пользователей
export const BASE_TASK_COLUMNS = columnHelper.columns([
    columnHelper.accessor('name', {
        header: 'Название',
        cell: (info) => info.getValue(),
    }),

    columnHelper.accessor((row) => row.learningTopic.name, {
        id: 'learningTopicName',
        header: 'Тема задачи',
        cell: (info) => info.getValue(),
    }),

    columnHelper.accessor((row) => row.learningTopic.level.name, {
        id: 'levelName',
        header: 'Уровень',
        cell: (info) => (
            <CenteredCell>
                <p>{info.getValue()}</p>
            </CenteredCell>
        ),
    }),

    columnHelper.accessor('quality', {
        header: 'Сложность',
        cell: ({ getValue }) => {
            const quality = getValue();
            return (
                <CenteredCell>
                    <p>{quality.label}</p>
                    <QualityBadge $color={`#${quality.lightColor}`} />
                </CenteredCell>
            );
        },
    }),
]);

// Дополнительные колонки только для администратора
export const EXTRA_ADMIN_TASK_COLUMNS = columnHelper.columns([
    columnHelper.display({
        id: 'positionAction',
        header: 'Позиция',
        cell: ({ row }) => {
            const task = row.original;
            const hasPosition = Boolean(
                task.position && Object.keys(task.position).length > 0
            );

            // Изолируем переход по ссылке от клика строки таблицы (onRowClicked)
            const handleNavigateToConstructor = (e: React.MouseEvent): void => {
                e.stopPropagation();
                window.location.href = `/task-constructor/${task.id}`;
            };

            return (
                <CenteredCell>
                    {hasPosition ? (
                        <TextButton
                            text="Редактировать"
                            onClick={handleNavigateToConstructor}
                            style={{
                                width: '80%',
                                height: '3rem',
                                fontSize: '1rem',
                                gap: '1rem',
                                padding: '1rem 2rem',
                                color: 'var(--primary-text-inverted)',
                                fontWeight: 400,
                                border: '1px solid var(--secondary-border-color)',
                            }}
                        />
                    ) : (
                        <IconButton
                            Icon={() => <PlusIcon color="var(--secondary-border-color)" />}
                            onClick={handleNavigateToConstructor}
                            style={{
                                height: '3rem',
                                width: '3rem',
                                marginRight: '0.8rem',
                                padding: '0.8rem',
                                backgroundColor: 'inherit',
                                border: '0.1rem solid var(--secondary-border-color)',
                            }}
                        />
                    )}
                </CenteredCell>
            );
        },
    }),
]);

// Функция-фабрика, вычисляющая итоговый список колонок
export function getTaskColumns(isAdmin: boolean): ColumnDef<AppTableFeatures, Task, unknown>[] {
    if (isAdmin) {
        return [...BASE_TASK_COLUMNS, ...EXTRA_ADMIN_TASK_COLUMNS];
    }
    return BASE_TASK_COLUMNS;
}