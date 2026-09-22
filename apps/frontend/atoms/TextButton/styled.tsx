import styled from "styled-components";

export const Button = styled.button<{ backgroundColor?: string }>`
    width: 100%;

    color: var(--primary-text-inverted);
    font-size: 1.6rem;
    font-weight: 600;
    letter-spacing: 0.1rem;
    background: ${props => props.backgroundColor ? props.backgroundColor : "var(--primary-btn-color)"};

    box-sizing: border-box;
    white-space: nowrap;

    border-radius: 1.5rem;
    outline: none;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;

    transition: transform 0.2s;

    &:hover {
        transform: scale(1.05);
        border: 1px solid white;
    }

    &:disabled {
        pointer-events: none;
        cursor: not-allowed;
    }
`

export const IconWrapper = styled.div`
    width: auto;
    height: auto;

    min-width: 1.6rem;
    min-height: 1.6rem;

    display: flex;
    align-items: center;
    justify-content: center;
`