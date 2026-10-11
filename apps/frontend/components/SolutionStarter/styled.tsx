import styled from "styled-components";
import { HomeworkSolutionStatus } from "../../store/homeworks/types";

export const ScreenWrapper = styled.main`
  height: auto;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.4rem;
  background-color: var(--secondary-background-light);
  margin-top: 6rem;
`;

export const StarterCard = styled.div`
  background-color: var(--primary-block-background-light);
  border: 1px solid var(--primary-table-border);
  border-radius: 2rem;
  padding: 4rem 3.2rem;
  width: 100%;
  max-width: 58rem;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  box-shadow: 0 1.2rem 3.2rem rgba(0, 0, 0, 0.04);
`;

export const CardHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 2.6rem;
  font-weight: 700;
  color: var(--primary-text);
  margin: 0;
  line-height: 1.3;
`;

const getStatusBadgeStyle = (status: HomeworkSolutionStatus) => {
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
  font-size: 1.3rem;
  font-weight: 600;
  padding: 0.6rem 1.2rem;
  border-radius: 0.8rem;
  background-color: ${({ $status }) => getStatusBadgeStyle($status).bg};
  color: ${({ $status }) => getStatusBadgeStyle($status).color};
`;

export const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 2.4rem;
  background-color: var(--secondary-background-light);
  border-radius: 1.4rem;
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
  color: var(--primary-placeholder-color);

  strong {
    color: var(--primary-text);
    font-weight: 600;
  }
`;

export const ActionsContainer = styled.footer`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const StatusMessage = styled.div<{ $variant: "solved" | "checked" }>`
  width: 100%;
  padding: 1.8rem;
  border-radius: 1.2rem;
  text-align: center;
  font-size: 1.6rem;
  font-weight: 600;
  background-color: ${({ $variant }) =>
        $variant === "solved"
            ? "var(--light-selected-background)"
            : "rgba(46, 204, 113, 0.12)"};
  color: ${({ $variant }) =>
        $variant === "solved" ? "var(--secondary-text)" : "#27ae60"};
  border: 1px solid
    ${({ $variant }) =>
        $variant === "solved" ? "var(--secondary-border-color)" : "transparent"};
`;