import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
  padding: 4px;
  position: relative;
`;

export const MainGrid = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 440px;
  gap: 20px;
  flex: 1;
  min-height: 0;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    overflow-y: auto;
  }
`;

export const BoardWrapper = styled.div`
  background: #ffffff;
  box-sizing: border-box;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);

  & > div {
    max-width: 520px;
    max-height: 520px;
    width: 100% !important;
  }
`;

export const BoardInner = styled.div`
  width: 100%;
  max-width: 520px;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;