import styled from 'styled-components';
import { motion } from 'framer-motion';

export const DashboardContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  padding: 4px;

  /* Скрытие скроллбара */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
`;

export const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1.5fr 1.2fr;
  gap: 20px;
  flex: 1;
  min-height: 260px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

export const EmptyContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 24px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
  text-align: center;
`;

export const IconBadge = styled(motion.div)`
  width: 88px;
  height: 88px;
  border-radius: 28px;
  background: linear-gradient(
    135deg,
    rgba(100, 108, 255, 0.12) 0%,
    rgba(33, 189, 202, 0.12) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  position: relative;
  box-shadow: 0 8px 24px rgba(100, 108, 255, 0.15);

  /* Декоративная пунктирная рамка снаружи */
  &::after {
    content: '';
    position: absolute;
    inset: -6px;
    border-radius: 34px;
    border: 2px dashed rgba(100, 108, 255, 0.25);
  }

  svg {
    width: 42px;
    height: 42px;
    color: #646cff;
  }
`;

export const Title = styled.h3`
  margin: 0 0 12px 0;
  font-size: 22px;
  font-weight: 700;
  color: #1a1a1a;
`;

export const Description = styled.p`
  margin: 0;
  max-width: 440px;
  font-size: 15px;
  line-height: 1.6;
  color: #777777;
`;

export const AccentBadge = styled.div`
  margin-top: 24px;
  padding: 6px 14px;
  border-radius: 20px;
  background: rgba(255, 159, 36, 0.12);
  color: rgba(255, 159, 36, 1);
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
`;
