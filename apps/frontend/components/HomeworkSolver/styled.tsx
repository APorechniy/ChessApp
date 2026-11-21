import styled from "styled-components";

export const SolverContainer = styled.main`
  max-width: 120rem;
  margin: 3rem auto;
  padding: 2.4rem 2rem;
  box-sizing: border-box;

  @media (max-width: 600px) {
    padding: 1.6rem 1.2rem;
  }
`;

export const StepperHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem;
  margin-bottom: 2.4rem;
  overflow-x: auto;
  padding-bottom: 0.8rem;

  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--primary-table-border);
    border-radius: 4px;
  }
`;

export const StepItem = styled.button<{
  $isActive: boolean;
  $isSolved: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: 2px solid
    ${({ $isActive, $isSolved }) =>
    $isActive
      ? "var(--secondary-border-color)"
      : $isSolved
        ? "var(--primary-orange)"
        : "var(--primary-table-border)"};
  background-color: ${({ $isActive, $isSolved }) =>
    $isActive
      ? "var(--light-selected-background)"
      : $isSolved
        ? "rgba(255, 159, 36, 0.15)"
        : "var(--primary-block-background-light)"};
  color: ${({ $isActive, $isSolved }) =>
    $isActive
      ? "var(--secondary-text)"
      : $isSolved
        ? "var(--primary-orange)"
        : "var(--primary-placeholder-color)"};
  font-weight: 700;
  font-size: 1.4rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--secondary-border-color);
  }
`;

export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 38rem;
  gap: 2.4rem;
  align-items: stretch;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const StateFeedback = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 30rem;
  font-size: 1.6rem;
  color: var(--primary-placeholder-color);
  background: var(--primary-block-background-light);
  border-radius: 1.2rem;
  border: 1px dashed var(--input-border);
`;