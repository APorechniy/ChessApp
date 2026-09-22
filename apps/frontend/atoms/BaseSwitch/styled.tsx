import styled from "styled-components";

export const SwitchContainer = styled.div`
    box-sizing: border-box;
    height: 4rem;
    width: auto;
    display: flex;
    align-items: center;
    flex-direction: row;
`;

export const Switch = styled.div<{ $isChecked: boolean, $isDisabled: boolean }>`
    width: 3rem;
    min-width: 3rem;
    height: 3rem;
    font-size: 1.8rem;
    line-height: 2.4rem;

    padding: 0.5rem;
    box-sizing: border-box;

    background-color: ${props => props.$isChecked ? "var(--primary-btn-color)" : "var(--primary-background)"};
    color: var(--primary-text);

    border-radius: 0.5rem;
    border: 1px solid var(--primary-border);

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
`

export const SwitchLabel = styled.label`
    width: auto;

    color: var(--primary-text);

    margin-left: 1rem;
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.6rem;

    word-break: keep-all;
`

export const SwitchError = styled.p`
    color: red;
    width: 100%;
    text-align: left;
    margin-top: 16;
`