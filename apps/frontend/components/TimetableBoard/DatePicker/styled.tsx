import styled from "styled-components";

export const DateWrapper = styled.div`
    width: 100%;
    height: 7rem;

    color: var(--primary-text);

    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: nowrap;
`;

export const DateItem = styled.div<{ $isSelected: boolean }>`
    width: 5rem;
    height: 7rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-conten: center;
    gap: 0.6rem;

    background: var(--primary-background-light);
    border-radius: 0.6rem;

    box-sizing: border-box;
    padding: 1rem 0;

    cursor: pointer;

    p {
        color: ${props => props.$isSelected ? "var(--secondary-text)" : "var(--input-border)"};
    }

    &:hover {
        p {
            color: var(--secondary-text);
        }
    }
`

export const DateNumber = styled.p`
    margin: 0;

    font-size: 1.6rem;
    font-weight: 500;
    letter-spacing: 0;
`

export const Day = styled.p`
    margin: 0;

    font-size: 1.4rem;
    font-weight: 400;
    letter-spacing: 0;
`