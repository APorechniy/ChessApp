import styled from "styled-components";

export const BoardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const BoardContainer = styled.div`
  width: 100%;
  max-width: 54rem;
  aspect-ratio: 1 / 1;
  background-color: var(--primary-block-background-light);
  border-radius: 1.6rem;
  box-shadow: 0 0.8rem 2.4rem rgba(0, 0, 0, 0.06);
  padding: 1.2rem;
  box-sizing: border-box;

  @media (max-width: 600px) {
    max-width: 100%;
    padding: 0.6rem;
    border-radius: 1.2rem;
  }
`;