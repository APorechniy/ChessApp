import styled from "styled-components";

export const Panel = styled.section`
    width: 32rem;
    height: 95%;

    overflow: hidden;

    margin-left: 1rem;

    box-sizing: border-box;

    background: var(--primary-block-background-light);

    border-radius: 1.5rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`

export const LogoWrapper = styled.div`
    width: 100%;
    height: auto;

    margin-top: 3rem;
`

export const NavigationWrapper = styled.div`
    width: 100%;

    box-sizing: border-box;
    
    flex: 1;

    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    
    padding-top: 4rem;
    padding-right: 2rem;
`

export const NavigationLink = styled.a`
    height: auto;
    width: 100%;

    display: block;

    text-decoration: none;

    &:hover p {
        color: var(--hovered-text-light);
    }

    &:hover path {
        stroke: var(--hovered-text-light);
    }
`

export const NavigationItem = styled.div`
    width: 100%;
    height: 6rem;

    box-sizing: border-box;

    padding-left: 3rem;

    display: flex;
    align-items: center;
    justify-content: flex-start;

    gap: 3rem;

    cursor: pointer;
`

export const NavigationExit = styled.div`
    width: 100%;
    height: 6rem;

    box-sizing: border-box;

    padding-left: 3rem;

    display: flex;
    align-items: center;
    justify-content: flex-start;

    margin-top: auto;
    margin-bottom: 3rem;

    gap: 3rem;

    cursor: pointer;

    
    &:hover p {
        color: var(--hovered-text-light);
    }

    &:hover path {
        stroke: var(--hovered-text-light);
    }

    &:hover rect {
        stroke: var(--hovered-text-light);
    }
`

export const NavigationItemText = styled.p`
    width: auto;

    font-weight: 400;
    font-size: 1.6rem;
    color: var(--primary-text-light);
`