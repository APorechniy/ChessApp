import styled, { css } from 'styled-components';

export const TableContainer = styled.div<{ readonly $isNested?: boolean }>`
    width: 100%;
    overflow-x: auto;
    color: #1e293b;
    background-color: transparent;

    ${({ $isNested }) =>
        $isNested &&
        css`
            padding: 0.2rem 0;
        `}
`;

export const TableElement = styled.table`
    width: 100%;
    border-collapse: separate !important;
    border-spacing: 0 0.8rem; /* Гарантированный зазор между строками-карточками */
    text-align: left;
`;

export const Th = styled.th`
    padding: 0.8rem 1.6rem;
    font-size: 1.2rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #64748b;
    border-bottom: 2px solid #e2e8f0;
    white-space: nowrap;

    &:first-child {
        width: 48px;
        text-align: center;
    }
`;

export const Tr = styled.tr<{
    readonly $isClickable?: boolean;
    readonly $isExpanded?: boolean;
}>`
    cursor: ${({ $isClickable }) => ($isClickable ? 'pointer' : 'default')};
    transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.15s ease;

    &:hover {
        transform: translateY(-2px);
    }
`;

export const Td = styled.td<{
    readonly $mainColor?: string;
    readonly $textColor?: string;
    readonly $isExpanded?: boolean;
}>`
    padding: 1.4rem 1.6rem;
    font-size: 1.4rem;
    font-weight: 500;

    /* Дефолтный белый цвет для карточки строки */
    background-color: ${({ $mainColor }) => $mainColor || '#ffffff'};
    color: ${({ $textColor }) => $textColor || '#1e293b'};

    /* Четкие физические границы карточки, чтобы строки не слипались */
    border-top: 1px solid ${({ $isExpanded }) => ($isExpanded ? '#6366f1' : '#e2e8f0')};
    border-bottom: 1px solid ${({ $isExpanded }) => ($isExpanded ? '#6366f1' : '#e2e8f0')};
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;

    /* Скругление левого края */
    &:first-child {
        border-top-left-radius: 0.8rem;
        border-bottom-left-radius: 0.8rem;
        border-left: 1px solid ${({ $isExpanded }) => ($isExpanded ? '#6366f1' : '#e2e8f0')};
    }

    /* Скругление правого края */
    &:last-child {
        border-top-right-radius: 0.8rem;
        border-bottom-right-radius: 0.8rem;
        border-right: 1px solid ${({ $isExpanded }) => ($isExpanded ? '#6366f1' : '#e2e8f0')};
    }

    ${Tr}:hover & {
        background-color: ${({ $mainColor }) => ($mainColor ? $mainColor : '#f8fafc')};
        border-color: #cbd5e1;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.08);
    }
`;

export const ExpanderButton = styled.button<{ readonly $isExpanded: boolean }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.8rem;
    height: 2.8rem;
    background: ${({ $isExpanded }) => ($isExpanded ? '#e0e7ff' : 'transparent')};
    border: none;
    cursor: pointer;
    border-radius: 0.6rem;
    color: ${({ $isExpanded }) => ($isExpanded ? '#4338ca' : '#64748b')};
    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.2s ease, color 0.2s ease;
    transform: ${({ $isExpanded }) => ($isExpanded ? 'rotate(90deg)' : 'rotate(0deg)')};

    &:hover {
        color: #1e293b;
        background-color: #f1f5f9;
    }
`;

export const ExpandedRow = styled.tr`
    background: transparent;
`;

export const ExpandedCell = styled.td`
    padding: 0 0.8rem 1rem 3.8rem; /* Отступ слева для визуального дерева вложенности */
`;

export const ExpandedContentWrapper = styled.div`
    padding: 1.6rem;
    border-radius: 1rem;
    background-color: #f8fafc;
    border: 1px solid #e2e8f0;
    border-left: 3px solid #6366f1; /* Индикатор связи с родительской темой */
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.03);
`;