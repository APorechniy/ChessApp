import styled from "styled-components";

export const Container = styled.section`
  max-width: 120rem;
  margin: 0 auto;
  padding: 5.6rem 2rem;
`;

export const Header = styled.header`
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

export const SolutionsGrid = styled.div`
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