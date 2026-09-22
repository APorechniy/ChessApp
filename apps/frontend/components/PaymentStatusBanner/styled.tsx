import styled from "styled-components";

export const Wrapper = styled.div`
    width: 80%;

    margin-top: 2rem;

    margin-left: 10%;
    margin-right: 10%;

    box-sizing: border-box;
    padding-top: 4rem;
    padding-left: 20%;
    padding-right: 20%;
    padding-bottom: 4rem;

    border-radius: 2rem;
    border: 1px solid var(--primary-border);

    background-color: var(--secondary-background);
    color: var(--primary-text);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
`

export const MessageBlock = styled.div`
    width: 30rem;
    height: auto;

    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const IconWrapper = styled.div`
    width: 20rem;
    height: 20rem;

    display: flex;
    align-items: center;
    justify-content: center;
`

export const Title = styled.h3`
    width: 100%;

    margin-top: 2rem;

    text-align: center;
    
    font-size: 2rem;
    font-weight: 600;
    color: var(--primary-text-inverted);
`