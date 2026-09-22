import styled from 'styled-components';

export const InputContainer = styled.div`
    box-sizing: border-box;
    height: 7rem;
    width: 100%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;

    &:disabled {
        color: grey;
        cursor: not-allowed;
    }
`

export const InputLabel = styled.label`
    width: 100%;

    color: var(--primary-placeholder-color);
    text-align: left;

    font-size: 1.4rem;
    margin-left: 2rem;
    margin-bottom: 0.6rem;
    line-height: 1.6rem;
`

export const Input = styled.textarea`
    width: 100%;
    height: 8rem;
    font-size: 2rem;
    line-height: 3rem;

    resize: none;

    padding: 0.5rem 2rem;
    box-sizing: border-box;

    background-color: var(--secondary-background-light);

    border-radius: 1.2rem;
    border: 0.1rem solid var(--primary-text-light);

    &:disabled {
        background-color: var(--primary-input-background-light);
    }

    &:focused {
        border: 1px solid var(--primary-border);
    }

    &::placeholder {
        color: var(--primary-placeholder-color);
    }
    &::-webkit-input-placeholder {
        color: var(--primary-placeholder-color);
    }
`

export const InputError = styled.p`
    color: red;
    width: 100%;
    height: 1.5rem;
    text-align: left;
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 0.4rem;
    margin-bottom: 0;
`