import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.aside`
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
  overflow-y: auto;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SectionTitle = styled.h4`
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: #1a1a1a;
`;

export const TurnSelector = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  background: rgba(0, 0, 0, 0.04);
  padding: 4px;
  border-radius: 12px;
`;

export const TurnButton = styled.button<{ $active: boolean }>`
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  ${({ $active }) =>
        $active
            ? `
    background: #646cff;
    color: #ffffff;
    box-shadow: 0 2px 8px rgba(100, 108, 255, 0.3);
  `
            : `
    background: transparent;
    color: #777777;
  `}
`;

export const SparePiecesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 6px;
  background: rgba(0, 0, 0, 0.02);
  padding: 8px;
  border-radius: 12px;
`;

export const SparePieceWrapper = styled.div`
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  border-radius: 8px;
  transition: background 0.15s ease;

  &:hover {
    background: rgba(100, 108, 255, 0.1);
  }
`;

export const FenInput = styled.textarea`
  width: 100%;
  height: 70px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(0, 0, 0, 0.02);
  font-family: monospace;
  font-size: 12px;
  resize: none;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #646cff;
  }
`;

export const Notification = styled(motion.div)`
  padding: 12px;
  border-radius: 10px;
  background: rgba(33, 189, 202, 0.15);
  color: #21bdca;
  font-size: 13px;
  font-weight: 600;
  text-align: center;
`;