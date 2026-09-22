import styled from "styled-components";

export const CreateGroupModal = styled.div`
    width: min(100vw,60rem);
    max-width: 60rem;
    height: auto;
    max-height: 53rem;

    padding: 2rem;

    border-radius: 2rem;

    background-color: var(--primary-block-background-light);
    color: var(--primary-text);

    position: relative;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    @media (max-width: 768px) {
      margin: 1rem;
    }
`;

export const CreateGroupForm = styled.form`
    width: 100%;
    max-width: 100%;
    height: auto;

    box-sizing: border-box;
    padding-bottom: 2rem;
    padding-top: 2rem;

    gap: 2rem;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;

export const CreateGroupFormTitle = styled.h3`
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