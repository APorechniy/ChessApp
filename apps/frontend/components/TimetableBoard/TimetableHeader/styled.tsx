import styled from "styled-components";

export const HeaderContainer = styled.div`
    width: 100%;
    height: 9rem;

    color: var(--primary-text);

    box-sizing: border-box;
    padding: 2rem 1rem;

    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    gap: 2rem;

    @media (max-width: 768px) {
        flex-direction: column-reverse;
        height: auto;
    } 
`;

export const LeftBlock = styled.div`
    width: 40%;
    max-width: 40%;
    height: 5rem;

    display: flex;
    align-items: center;
    flex-wrap: nowrap;

    @media (max-width: 768px) {
        width: 100%;
        max-width: 100%;
    } 
`

export const DateRangeBlock = styled.div`
    width: auto;
    height: 5rem;

    display: flex;
    align-items: center;
    flex-wrap: nowrap;
`

export const CurrentSelectedDate = styled.div`
    color: var(--secondary-text);
    font-size: 1.6rem;
    font-weight: 500;
`

export const ArrowsBlock = styled.div`
    width: auto;
    height: 5rem;

    margin-left: auto;

    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    gap: 2rem;
`

export const ArrowItem = styled.div`
    width: 2rem;
    height: 2rem;

    cursor: pointer;
`

export const ButtonBlock = styled.div`
    width: auto;
    height: 5rem;

    margin-left: auto;

    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    gap: 1rem;

    @media (max-width: 768px) {
        margin-left: 0;
    } 
`