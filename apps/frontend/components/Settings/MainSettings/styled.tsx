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
    column-gap: 4rem;
    row-gap: 2rem;

    @media (max-width: 768px) {
      height: auto;
      grid-template-columns: 1fr;
      padding-top: 0;
      row-gap: 1rem;

      margin-top: 2rem;
    }
`