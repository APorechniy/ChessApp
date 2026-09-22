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

export const ChartWrapper = styled.div`
  flex: 1;
  width: 100%;
  min-height: 180px;
`;