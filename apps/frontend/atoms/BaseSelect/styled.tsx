import styled from "styled-components";

export const SelectContainer = styled.div<{ $height: string }>`
    height: ${props => props.$height ? props.$height : "4.5rem"};
    width: 100%;
    min-width: 0;

    box-sizing: border-box;
    position: relative;
    
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
`;

export const Select = styled.div<{ $isDisabled: boolean, $isActive: boolean, }>`
    width: 100%;
    height: 4rem;
    font-size: 1.8rem;
    line-height: 2.4rem;

    position: relative;

    padding: 0.8rem 2rem;
    box-sizing: border-box;

    background-color: ${props => props.$isDisabled ? "var(--primary-background-light)" : "var(--primary-background)"};
    color: var(--primary-text-light);

    border-radius: 1.2rem;
    text-align: left;
    border: 1px solid ${props => props.$isActive ? "var(--secondary-border-color)" : "var(--primary-text-light)"};
    outline: none;

    cursor: pointer;

    &:disabled {
        color: grey;
        cursor: not-allowed;
    }
`;

export const OptionsBlock = styled.div`
    position: absolute;

    min-width: 100%;
    max-width: 100%;
    max-height: 21rem;
    overflow-y: scroll;
    overflow-x: hidden;

    top: 4.8rem;
    left: 0;

    background: var(--secondary-background-light);

    border: 1px solid var(--secondary-border-color);
    border-radius: 0.8rem;

    z-index: 1;
`

export const Option = styled.div`
    width: 100%;
    height: 4rem;

    text-align: left;

    display: flex;
    align-items: center;

    box-sizing: border-box;
    padding: 1rem 1rem;

    &:hover {
        color: var(--primary-text-inverted);
        background: var(--secondary-background);
    }

    &:hover p {
        color: var(--primary-text-inverted);
    }
`

export const OptionText = styled.p`
    width: 100%;

    color: var(--primary-text);
    font-size: 1.8rem;
    font-weight: 400;

    display: block;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

export const ChevronBlock = styled.div<{ $isRotate: boolean }>`
    width: auto;
    height: 100%;

    position: absolute;
    top: 0;
    right: 1rem;

    display: flex;
    align-items: center;
    flex-direction: row;

    ${props => props.$isRotate && `rotate: 180deg`};

    transition: rotate 0.2s ease-out;
`

export const SelectValue = styled.div`
    width: 100%;
    height: 100%;

    padding-right: 1rem;
    box-sizing: border-box;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

export const SelectLabel = styled.label`
    width: 100%;

    color: var(--primary-text-light);
    text-align: left;

    padding-left: 4rem;
    margin-bottom: 0.6rem;

    font-size: 1.4rem;
    line-height: 1.6rem;
`