import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;

    box-sizing: border-box;
    padding: 1rem;

    display: flex;
    flex-direction: column;
    align-items: flex-start;

    @media (max-width: 768px) {
      padding: 0;
    }
`