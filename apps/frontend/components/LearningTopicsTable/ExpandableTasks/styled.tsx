import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex: 1 1 auto;
`

export const EmptyWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
  padding: 4rem 2.4rem;
  border-radius: 1.2rem;
  text-align: center;
`;

export const Message = styled.p`
  margin: 0;
  font-family: inherit;
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1.5;
  color: var(--primary-text-light);
`;