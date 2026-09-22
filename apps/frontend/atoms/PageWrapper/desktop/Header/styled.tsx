import styled from "styled-components";

export const HeaderBlock = styled.header`
    width: 100%;
    height: 12rem;

    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: nowrap;

    box-sizing: border-box;
    padding-left: 4rem;
`

export const LeftBlock = styled.div`
    width: auto;
    height: 100%;

    display: flex;
    align-items: center;
`

export const RightBlock = styled.div`
    width: 30rem;
    height: 9rem;

    margin-left: auto;

    background: var(--primary-block-background-light);
    border-radius: 1.5rem;

    box-sizing: border-box;
    padding: 2rem;

    display: flex;
    align-items: center;

    position: relative;

    z-index: 2;
`

export const ExpandedMenu = styled.div`
    position: absolute;
    top: 10rem;
    left: 0;
    right: 0;

    width: 100%;
    height: auto;

    background: var(--primary-block-background-light);
    border-radius: 1.5rem; 

    box-sizing: border-box;
    padding: 1rem;

    display: flex;
    align-items: center;
    flex-direction: column;
`

export const ClubIcon = styled.div`
    width: 8.4rem;
    height: 8.4rem;

    border-radius: 50%;

    border: 1px solid var(--secondary-border-color);
    background: url("/clublogo.png");
    background-repeat: no-repeat;
    background-size: contain;
`

export const TitlesBlock = styled.div`
    width: auto;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    margin-left: 1rem;
`

export const ClubName = styled.h3`
    font-weight: 400;
    font-size: 1.4rem;
    color: var(--secondary-text);

    margin: 0;
`

export const PageName = styled.h1`
    font-weight: 600;
    font-size: 3rem;
    color: var(--primary-text);

    margin: 0;
`

export const Avatar = styled.div`
    width: 4.2rem;
    height: 4.2rem;
    min-width: 4.2rem;

    border-radius: 50%;

    border: 1px solid var(--secondary-border-color);
    background: var(--primary-placeholder-color);
`

export const Username = styled.h3`
    font-weight: 500;
    font-size: 1.4rem;
    color: var(--primary-text);

    margin: 0;
`

export const Role = styled.h4`
    font-weight: 400;
    font-size: 1.2rem;
    color: var(--primary-text-light);

    margin: 0;
`

export const ActiveArrow = styled.div<{ isRotate: boolean }>`
    width: 3rem;
    height: 3rem;

    margin-left: auto;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    transform: rotate(${props => props.isRotate ? '180deg' : '0deg'});
    transition: transform 0.2s ease-out;
`

export const ExpandedMenuItem = styled.a`
    width: 100%;
    height: 5rem;

    border-radius: 1.2rem;

    padding: 1rem;
    box-sizing: border-box;

    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: nowrap;

    gap: 2rem;

    cursor: pointer;
    text-decoration: none;

    color: var(--primary-text);
    font-weight: 500;
    font-size: 1.4rem;

    &:hover {
        background: var(--primary-btn-color);
        color: var(--primary-text-inverted);
    }

    * path {
        fill: var(--primary-text);
    }

    &:hover path {
        fill: var(--primary-text-inverted);
    }
`