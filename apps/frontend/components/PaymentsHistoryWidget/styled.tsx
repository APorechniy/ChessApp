import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    max-height: 28rem;
    min-height: 28rem;
    
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 0.8rem;

    margin-bottom: 1rem;

    overflow-y: scroll;

    border: 1px solid var(--primary-border);
    border-radius: 1.5rem;

    box-sizing: border-box;
    padding: 1rem;
`

export const Title = styled.div`
    width: 100%;
    height: 2rem;

    font-size: 1.6rem;
    font-weight: 600;
`

export const PaymentItem = styled.div`
    width: 100%;
    height: 4rem;

    display: flex;
    align-items: center;

    background: var(--secondary-background-light);
    border-radius: 1rem;

    box-sizing: border-box;
    padding: 0.8rem;
`

export const DateItem = styled.div`
    width: 100%;
    height: 2rem;

    display: flex;
    align-items: center;

    box-sizing: border-box;
    padding: 0.8rem;

    font-weight: 500;
    color: var(--primary-text-light);
    font-size: 1rem;
`

export const LeftPaymentBlock = styled.div`
    width: auto;
    height: 100%;

    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;

    box-sizing: border-box;
`

export const Name = styled.p`
    font-weight: 500;
    color: var(--primary-text-light);
    font-size: 1.2rem;
`

export const Tag = styled.div<{ bgColor?: string, txtColor?: string }>`
    width: auto;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 0.8rem;

    margin-left: auto;

    box-sizing: border-box;
    padding: 0 1rem;

    background: ${props => props.bgColor ? props.bgColor : "#21BDCA"};
    color: ${props => props.txtColor ? props.txtColor : "var(--primary-text-inverted)"};
    font-size: 1.4rem;
    font-weight: 600;
`

export const StyledInputWrapper = styled.div`
    width: 100%;
    height: 4rem;

    background: white;

    box-sizing: border-box;
    padding: 0 0.8rem;

    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: nowrap;

    border: 1px solid var(--input-border);
    border-radius: 1.2rem;

    cursor: pointer;

    @media (max-width: 768px) {
        background: var(--primary-block-background-light);
    } 
`

export const StyledInput = styled.input`
    width: 100%;
    height: 2rem;

    padding: 0 1rem;

    font-size: 1.6rem;
    font-weight: 400;
    color: var(--primary-text);

    text-decoration: none;
    outline: none;
    border: none;
`