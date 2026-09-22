import styled from 'styled-components';
import { motion } from 'framer-motion';

export type Alignment = 'left' | 'center' | 'right' | 'between';

const alignmentMap: Record<Alignment, string> = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end',
    between: 'space-between',
};

// Главный контейнер (100% ширины и высоты)
export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

// Шапка с табами
export const Header = styled.div<{ $align: Alignment }>`
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding-bottom: 8px;
  overflow-x: auto;
  flex-shrink: 0;
  justify-content: ${({ $align }) => alignmentMap[$align] || 'flex-start'};

  /* Скрытие скроллбара */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (prefers-color-scheme: dark) {
    border-bottom-color: rgba(255, 255, 255, 0.1);
  }
`;

// Кнопка таба
export const TabButton = styled.button<{ $isActive: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 12px;
  border: none;
  background: transparent;
  cursor: pointer;
  outline: none;
  user-select: none;
  white-space: nowrap;
  transition: color 0.2s ease;

  color: ${({ $isActive }) => ($isActive ? '#646cff' : '#666666')};

  &:hover {
    color: ${({ $isActive }) => ($isActive ? '#646cff' : '#111111')};
  }
`;

// Текст внутри таба
export const TabText = styled.span`
  position: relative;
  z-index: 10;
`;

// Иконка внутри таба
export const TabIcon = styled.span`
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
`;

// Анимированный полупрозрачный фон активного таба
export const ActiveHighlight = styled(motion.div)`
  position: absolute;
  inset: 0;
  background-color: rgba(100, 108, 255, 0.1);
  border-radius: 12px;
`;

// Анимированное подчеркивание
export const ActiveBorder = styled(motion.div)`
  position: absolute;
  bottom: -9px; /* Перекрывает нижний border шапки */
  left: 8px;
  right: 8px;
  height: 2px;
  background-color: #646cff;
  border-radius: 9999px;
`;

// Область контента (занимает всё оставшееся место)
export const ContentContainer = styled.div`
  flex: 1;
  min-height: 0; /* Критично для корректного скролла внутри flex-1 */
  width: 100%;
  position: relative;
  margin-top: 16px;
  overflow: hidden;
`;

// Обертка контента с анимацией появления
export const AnimatedContent = styled(motion.div)`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.15);
    border-radius: 10px;
  }
`;