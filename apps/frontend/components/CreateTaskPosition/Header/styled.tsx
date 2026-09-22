import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
  flex-shrink: 0;
  box-sizing: border-box;
`;

export const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
`;

export const Subtitle = styled.span`
  font-size: 13px;
  color: #888888;
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Button = styled(motion.button) <{ $variant?: 'primary' | 'danger' | 'clear' }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  outline: none;
  transition: all 0.2s ease;

  ${({ $variant }) => {
    if ($variant === 'primary') {
      return `
        background: #646cff;
        color: #ffffff;
        box-shadow: 0 4px 14px rgba(100, 108, 255, 0.35);
        &:hover { background: #535bf2; }
      `;
    }
    if ($variant === 'danger') {
      return `
        background: rgba(255, 82, 82, 0.1);
        color: #ff5252;
        &:hover { background: rgba(255, 82, 82, 0.2); }
      `;
    }
    return `
      background: rgba(0, 0, 0, 0.05);
      color: #555555;
      &:hover { background: rgba(0, 0, 0, 0.1); }
    `;
  }}
`;