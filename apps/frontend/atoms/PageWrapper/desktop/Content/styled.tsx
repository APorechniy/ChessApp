import styled from "styled-components";

export const Layout = styled.div`
    width: 100%;
    height: 95%;

    box-sizing: border-box;
    margin-left: 2rem;
    margin-right: 2rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`

export const ContentBlock = styled.div.attrs((props) => ({
    style: {
        ...props.style
    }
}))`
    width: 100%;
    flex: 1;

    background: var(--primary-block-background-light);

    border-radius: 2rem;

    box-sizing: border-box;
    padding: 2rem;
    margin-top: 2rem;

    overflow-y: scroll;
    overflow-x: hidden;
`