import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
`;

export const StudentInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: linear-gradient(135deg, #646cff 0%, #21bdca 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 700;
  font-size: 18px;
  box-shadow: 0 4px 12px rgba(100, 108, 255, 0.3);
`;

export const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const StudentName = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
`;

export const Badge = styled.div`
  padding: 8px 14px;
  background: rgba(100, 108, 255, 0.1);
  color: #646cff;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
`;