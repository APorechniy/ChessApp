import styled from "styled-components";

export const SidebarWrapper = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2.4rem;
  background-color: var(--primary-block-background-light);
  border: 1px solid var(--primary-table-border);
  border-radius: 1.6rem;
  padding: 2.4rem;
  box-sizing: border-box;

  @media (max-width: 900px) {
    padding: 1.8rem;
  }
`;

export const TaskMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const TaskTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-text);
  margin: 0;
`;

export const TurnIndicator = styled.div<{ $isWhiteTurn: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--primary-text);

  &::before {
    content: "";
    width: 1.4rem;
    height: 1.4rem;
    border-radius: 50%;
    border: 1px solid #c0c0c0;
    background-color: ${({ $isWhiteTurn }) =>
    $isWhiteTurn ? "#ffffff" : "#2c3e50"};
  }
`;

export const NotationBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  background-color: var(--secondary-background-light);
  border: 1px solid var(--primary-table-border);
  border-radius: 1.2rem;
  padding: 1.4rem;
`;

export const NotationLabel = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--primary-placeholder-color);
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const MovesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem 1rem;
  min-height: 4rem;
  align-items: center;
  font-size: 1.4rem;
`;

export const MoveItem = styled.span`
  display: inline-flex;
  gap: 0.4rem;
  font-family: monospace;
  font-weight: 600;
  color: var(--primary-text);

  span.number {
    color: var(--primary-placeholder-color);
    font-weight: 400;
  }
`;

export const EmptyMovesText = styled.span`
  color: var(--primary-placeholder-color);
  font-size: 1.3rem;
  font-style: italic;
`;

export const InstructionCard = styled.div`
  background-color: var(--secondary-background-light);
  border: 1px solid var(--primary-table-border);
  border-radius: 1.2rem;
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const InstructionHeading = styled.h4`
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--secondary-text);
  margin: 0;
`;

export const InstructionText = styled.p`
  font-size: 1.3rem;
  line-height: 1.5;
  color: var(--primary-placeholder-color);
  margin: 0;
`;

export const ActionsContainer = styled.footer`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;