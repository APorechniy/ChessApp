import styled from "styled-components";

export const CreateCoachModal = styled.div`
    width: min(100vw,60rem);
    max-width: 60rem;
    height: 61rem;
    max-height: 61rem;

    padding: 2rem;
    padding-bottom: 0;

    border-radius: 2rem;

    background-color: var(--primary-block-background-light);
    color: var(--primary-text);

    position: relative;

    overflow-y: scroll;
    overflow-x: hidden;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    @media (max-width: 768px) {
      margin: 1rem;
    }
`;

export const CreateCoachForm = styled.form`
    width: 100%;
    max-width: 100%;
    height: auto;

    box-sizing: border-box;
    padding-bottom: 2rem;
    padding-top: 2rem;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;

export const InputsBlock = styled.div`
    width: 100%;
    height: auto;

    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-columns: minmax(0, 1fr);
    gap: 1rem;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        grid-auto-columns: minmax(0, 1fr);
    }   
`

export const SelectsBlock = styled.div`
    width: 100%;
    height: auto;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-columns: minmax(0, 1fr);
    gap: 1rem;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        grid-auto-columns: minmax(0, 1fr);
        gap: 1rem;
    }   
`

export const CreateCoachFormTitle = styled.h3`
    text-align: left;
    margin: 0;
    margin-left: 1rem;

    color: var(--primary-text);
    font-size: 2.4rem;
    font-weight: 600;
`;

export const CloseButton = styled.div`
    width: 2.4rem;
    height: 2.4rem;

    position: absolute;
    top: 2rem;
    right: 2rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    cursor: pointer;
`