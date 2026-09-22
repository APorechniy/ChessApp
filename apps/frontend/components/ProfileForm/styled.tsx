import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;

    padding: 2rem;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    align-items: flex-start;

    @media (max-width: 768px) {
      padding: 0;
    }
`

export const ProfileHeader = styled.div`
    width: 100%;
    height: 4rem;

    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: nowrap;

    @media (max-width: 768px) {
      display: none;
    }
`

export const Title = styled.div`
    width: auto;

    font-weight: 600;
    font-size: 3rem;
    color: var(--primary-text);
`

export const FormWrapper = styled.div`
    width: max(50%, 70rem);
    height: 100%;

    @media (max-width: 768px) {
      width: 100%;
    }
`