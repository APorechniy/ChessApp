import styled from 'styled-components';
import { motion } from 'framer-motion';

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
`;

export const Card = styled(motion.div) <{ $color: string }>`
  background: #ffffff;
  padding: 20px;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background-color: ${({ $color }) => $color};
  }
`;

export const CardTitle = styled.span`
  font-size: 13px;
  color: #888888;
  font-weight: 500;
`;

export const CardValue = styled.div`
  font-size: 26px;
  font-weight: 800;
  color: #1a1a1a;
`;

export const CardSubValue = styled.span<{ $color: string }>`
  font-size: 12px;
  font-weight: 600;
  color: ${({ $color }) => $color};
`;