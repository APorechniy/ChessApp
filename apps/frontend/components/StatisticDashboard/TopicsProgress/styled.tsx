import styled from 'styled-components';

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

export const Title = styled.h3`
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 700;
  color: #1a1a1a;
`;

export const ChartContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex: 1;
`;

export const DonutWrapper = styled.div`
  width: 140px;
  height: 140px;
  position: relative;
`;

export const CenterText = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 20px;
  color: #1a1a1a;

  span {
    font-size: 11px;
    color: #888888;
    font-weight: 500;
  }
`;

export const Legend = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #555555;
`;

export const Dot = styled.span<{ $color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
`;