import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Card = styled.div`
  background: #ffffff;
  padding: 24px;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;

export const Title = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: #1a1a1a;
`;

export const MonthLabel = styled.span`
  width: 60%;
  font-size: 13px;
  font-weight: 600;
  color: #646cff;
  text-transform: capitalize;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
  flex: 1;
  align-content: start;
`;

// Квадратик дня с различными состояниями
export const DaySquare = styled(motion.div) <{
  $isActive: boolean;
  $isToday: boolean;
  $isFuture: boolean;
}>`
  aspect-ratio: 1;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
  user-select: none;
  box-sizing: border-box;

  /* Стилизация состояний (Занимался / Прошедший / Будущий день) */
  ${({ $isActive, $isFuture }) => {
    if ($isFuture) {
      return `
        background-color: rgba(0, 0, 0, 0.02);
        color: #bbbbbb;
        border: 1px dashed rgba(0, 0, 0, 0.08);
      `;
    }
    if ($isActive) {
      return `
        background: linear-gradient(135deg, #646cff 0%, #21BDCA 100%);
        color: #ffffff;
        box-shadow: 0 2px 6px rgba(100, 108, 255, 0.3);
      `;
    }
    return `
      background-color: rgba(0, 0, 0, 0.04);
      color: #555555;
    `;
  }}

  /* Выделение сегодняшнего дня */
  ${({ $isToday }) =>
    $isToday &&
    `
    border: 2px solid rgba(255, 159, 36, 1) !important;
  `}
`;

export const LegendRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
  font-size: 11px;
  color: #888888;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const LegendDot = styled.span<{ $bgColor: string; $border?: string }>`
  width: 8px;
  height: 8px;
  border-radius: 3px;
  background-color: ${({ $bgColor }) => $bgColor};
  border: ${({ $border }) => $border || 'none'};
`;