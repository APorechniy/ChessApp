import styled from "styled-components";

export const CardWrapper = styled.article`
  background-color: var(--primary-block-background-light);
  border: 1px solid var(--primary-table-border);
  border-radius: 1.2rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.6rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(83, 114, 231, 0.08);
    border-color: var(--secondary-border-color);
  }
`;

export const CardHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
`;

export const CardTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--primary-text);
  margin: 0;
  line-height: 1.4;
  word-break: break-word;
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  color: var(--primary-placeholder-color);
  gap: 0.6rem;

  span {
    color: var(--primary-text);
    font-weight: 500;
  }
`;

export const CardFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1.2rem;
  border-top: 1px solid var(--primary-table-border);
  font-size: 1.2rem;
`;

export const DeadlineBadge = styled.span<{ $isExpired: boolean }>`
  background-color: ${({ $isExpired }) =>
        $isExpired ? "rgba(255, 77, 79, 0.1)" : "var(--light-selected-background)"};
  color: ${({ $isExpired }) =>
        $isExpired ? "#ff4d4f" : "var(--secondary-text)"};
  padding: 0.4rem 0.8rem;
  border-radius: 0.6rem;
  font-weight: 600;
`;

export const TasksCountBadge = styled.span`
  background-color: var(--secondary-background-light);
  color: var(--primary-placeholder-color);
  padding: 0.4rem 0.8rem;
  border-radius: 0.6rem;
  font-weight: 500;
`;