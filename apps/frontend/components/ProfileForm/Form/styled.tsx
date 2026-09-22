import styled from 'styled-components'

export const StyledForm = styled.form`
    width: 100%;
    height: 100%;

    box-sizing: border-box;
    padding-top: 4rem;

    position: relative;

    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 8rem 8rem 8rem auto;
    grid-auto-rows: 8.5rem;
    row-gap: 0;
    gap: 1rem;

    @media (max-width: 768px) {
      height: auto;
      grid-template-columns: 1fr;
      padding-top: 0;
    }
`