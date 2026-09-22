import styled from "styled-components";

export const ContactsBlock = styled.div`
    width: 100%;
    height: auto;

    display: flex;
    flex-direction: column;
    align-items: flex-start;

    background: var(--primary-orange);

    box-sizing: border-box;
    padding: 1rem;

    border-radius: 1.2rem;

    margin-bottom: 1rem;
`

export const ContactsRow = styled.div`
    width: 100%;
    height: auto;

    display: flex;
    flex-direction: row;
    align-items: center;
`

export const VkLink = styled.a`
    color: white;
    font-weight: 400;
    font-size: 1.6rem;

    margin-left: 2rem;

    &:hover {
        color: white;
    }
`

export const Link = styled.a`
    color: white;
    font-weight: 400;
    font-size: 1.6rem;

    margin-top: 1rem;

    &:hover {
        color: white;
    }
`

export const SimpleContactsText = styled.p`
    color: white;
    font-weight: 400;
    font-size: 1.4rem;

    margin-top: 1rem;
    margin-bottom: 0;
`