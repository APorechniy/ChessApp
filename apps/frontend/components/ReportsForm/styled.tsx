import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;

    box-sizing: border-box;
    padding-left: 2rem;
    padding-right: 2rem;

    color: var(--primary-text);
    overflow: hidden;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 2rem;
`

export const InnerBlocks = styled.div`
    width: 100%;

    display: grid;
    grid-template-columns: repeat(2, 1fr);

    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        gap: 2rem;
    } 
`

export const Title = styled.h2`
    text-align: center;
    font-size: 2.4rem;
    font-weight: 600;
    color: var(--secondary-text);
`

export const LinkBlock = styled.div`
    width: auto;
    height: auto;

    box-sizing: border-box;
    padding: 2rem;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
    gap: 2rem;
    border: 0.2rem solid var(--secondary-background);
    border-radius: 1rem;
`

export const LinkText = styled.span`
    color: var(--secondary-text);
    font-size: 2rem;
    text-overflow: ellipsis;
`

export const FormWrapper = styled.div`
    width: 100%;
    max-height: 30rem;
    min-height: 30rem;
    
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 0.8rem;

    overflow-y: scroll;

    border: 1px solid var(--primary-border);
    border-radius: 1.5rem;

    box-sizing: border-box;
    padding: 1rem;
`

export const StudentItem = styled.div<{ isSelected: boolean }>`
    width: 100%;
    height: 4rem;

    display: flex;
    align-items: center;

    background: ${props => props.isSelected ? "var(--light-selected-background)" : "var(--secondary-background-light)"};
    border-radius: 1rem;

    box-sizing: border-box;
    padding: 0.8rem;

    cursor: pointer;
`

export const LeftStudentBlock = styled.div`
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

export const StyledInputWrapper = styled.div`
    width: 100%;
    height: 4rem;

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

export const ReportBlock = styled.div`
    width: 100%;
    max-height: 30rem;
    min-height: 30rem;
    
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 0.8rem;
    border-radius: 1.5rem;

    box-sizing: border-box;
    padding: 1rem;

    @media (max-width: 768px) {
        height: auto;
        min-height: 0;
        justify-content: flex-start;
    } 
`