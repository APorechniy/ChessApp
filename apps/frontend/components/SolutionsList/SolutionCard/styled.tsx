import styled from "styled-components";
import { HomeworkSolutionStatus } from "../../../store/homeworks/types";

export const CardWrapper = styled.article`
  background-color: var(--primary-block-background-light);
  border: 1px solid var(--primary-table-border);
  border-radius: 1.2rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  transition: all 0.2s ease-in-out;

  cursor: pointer;

  &:hover {
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

export const StudentName = styled.h3`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--primary-text);
  margin: 0;
  line-height: 1.4;
`;

const getStatusColor = (status: HomeworkSolutionStatus) => {
  switch (status) {
    case HomeworkSolutionStatus.New:
      return {
        bg: "var(--secondary-background-light)",
        color: "var(--primary-placeholder-color)",
      };
    case HomeworkSolutionStatus.InProgress:
      return {
        bg: "rgba(255, 159, 36, 0.15)",
        color: "var(--primary-orange)",
      };
    case HomeworkSolutionStatus.Solved:
      return {
        bg: "var(--light-selected-background)",
        color: "var(--secondary-text)",
      };
    case HomeworkSolutionStatus.Checked:
      return {
        bg: "rgba(46, 204, 113, 0.15)",
        color: "#27ae60",
      };
    default:
      return {
        bg: "var(--secondary-background-light)",
        color: "var(--primary-text)",
      };
  }
};

export const StatusBadge = styled.span<{ $status: HomeworkSolutionStatus }>`
  font-size: 1.2rem;
  font-weight: 600;
  padding: 0.4rem 0.8rem;
  border-radius: 0.6rem;
  background-color: ${({ $status }) => getStatusColor($status).bg};
  color: ${({ $status }) => getStatusColor($status).color};
  white-space: nowrap;
`;

export const DatesContainer = styled.footer`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding-top: 1.2rem;
  border-top: 1px solid var(--primary-table-border);
  font-size: 1.2rem;
`;

export const DateItem = styled.div`
  display: flex;
  justify-content: space-between;
  color: var(--primary-placeholder-color);

  span {
    color: var(--primary-text);
    font-weight: 500;
  }
`;