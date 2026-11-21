import styled from "styled-components";

export const DashboardContainer = styled.section`
  max-width: 120rem;
  margin: 0 auto;
  padding: 3.2rem 2rem;
`;

export const DashboardHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.4rem;
`;

export const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: 700;
  color: var(--primary-text);
  margin: 0;
`;

export const SectionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export const SectionTitle = styled.h2<{ $isExpired?: boolean }>`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${({ $isExpired }) => ($isExpired ? "#ff4d4f" : "var(--primary-text)")};
  margin: 0;
`;

export const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: var(--primary-table-border);
  margin: 0;
  width: 100%;
`;

export const HomeworkGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(28rem, 1fr));
  gap: 2rem;
`;

export const StateFeedback = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 20rem;
  font-size: 1.6rem;
  color: var(--primary-placeholder-color);
  background: var(--primary-block-background-light);
  border-radius: 1.2rem;
  border: 1px dashed var(--input-border);
`;