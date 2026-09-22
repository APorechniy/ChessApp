'use client';

import styled, { css, keyframes } from 'styled-components';
import { type NotificationVariant } from '../../../store/system/types';

type VariantProps = {
  $variant: NotificationVariant;
};

type ProgressBarProps = VariantProps & {
  $duration: number;
  $isPaused: boolean;
};

const shrinkAnimation = keyframes`
  from {
    transform: scaleX(1);
  }
  to {
    transform: scaleX(0);
  }
`;

const variantStyles = {
  error: css`
    background-color: #fef2f2;
    border-left-color: #ef4444;
    color: #991b1b;
  `,
  warning: css`
    background-color: #fffbeb;
    border-left-color: #f59e0b;
    color: #92400e;
  `,
  success: css`
    background-color: #ecfdf5;
    border-left-color: #10b981;
    color: #065f46;
  `,
  info: css`
    background-color: #eff6ff;
    border-left-color: #646cff;
    color: #646cff;
  `,
};

const badgeBackgrounds = {
  error: '#ef4444',
  warning: '#f59e0b',
  success: '#10b981',
  info: '#646cff',
};

const progressBarBackgrounds = {
  error: '#dc2626',
  warning: '#d97706',
  success: '#059669',
  info: '#646cff',
};

export const NotificationCard = styled.div<VariantProps>`
  position: relative;
  overflow: hidden;
  width: 320px;
  padding: 16px;
  padding-bottom: 20px;
  margin-bottom: 12px;
  border-radius: 8px; 
  border-left-width: 4px;
  border-left-style: solid;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 20px -3px rgba(0, 0, 0, 0.15);
  }

  ${({ $variant }) => variantStyles[$variant]}
`;

export const ContentContainer = styled.div`
  flex: 1;
  padding-right: 8px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Badge = styled.span<VariantProps>`
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
  text-transform: uppercase;
  color: #ffffff;
  background-color: ${({ $variant }) => badgeBackgrounds[$variant]};
`;

export const Title = styled.h4`
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  line-height: 1.2;
`;

export const Subtitle = styled.p`
  font-size: 12px;
  margin: 4px 0 0 0;
  opacity: 0.85;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #9ca3af;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  padding: 0 4px;
  transition: color 0.2s ease;

  &:hover {
    color: #374151;
  }
`;

export const ProgressBar = styled.div<ProgressBarProps>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: ${({ $variant }) => progressBarBackgrounds[$variant]};
  transform-origin: left;
  
  /* Анимация выполняется аппаратными средствами браузера (GPU) */
  animation: ${shrinkAnimation} ${({ $duration }) => $duration}ms linear forwards;
  
  /* При наведении мыши ставятся на паузу И CSS-анимация, И JS-таймер */
  animation-play-state: ${({ $isPaused }) => ($isPaused ? 'paused' : 'running')};
`;