import styled from "styled-components";

export const MainHeaderBlock = styled.div`
    width: 100%;
    height: auto;

    box-sizing: border-box;
    padding: 1rem;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`

export const HeaderMenuWrapper = styled.div`
    width: 100%;
    height: auto;

    box-sizing: border-box;

    background: var(--primary-block-background-light);

    border-radius: 1.5rem;
    
    box-sizing: border-box;
    padding: 2rem;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`

export const HeaderMenuBlock = styled.div`
    width: 100%;
    height: auto;

    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const HeaderNavPanel = styled.div`
    width: 100%;
    height: auto;

    margin-top: 2rem;
    box-sizing: border-box;
    padding-left: 1rem;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

export const ExpandedBlock = styled.div<{ $isOpen: boolean }>`
    width: 100%;
    max-height: ${props => props.$isOpen ? "300vh" : "0"};

    overflow: hidden;

    box-sizing: border-box;
    padding-top: ${props => props.$isOpen ? "3rem" : "0"};

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    transition: all 0.4s ease;
`

export const NavigationLink = styled.a`
    height: auto;
    width: 100%;

    display: block;

    text-decoration: none;
`

export const NavigationItem = styled.div`
    width: 100%;
    height: 6rem;

    border: 0.1rem solid var(--primary-text-light);
    border-radius: 1.2rem;
    padding-left: 2rem;
    box-sizing: border-box;

    display: flex;
    align-items: center;
    justify-content: flex-start;

    gap: 3rem;

    cursor: pointer;
`

export const ProfileBlock = styled.div`
    width: 100%;
    height: auto;

    box-sizing: border-box;

    background: var(--primary-block-background-light);
    border: 0.1rem solid var(--primary-text-light);
    border-radius: 1.5rem;
    padding: 2rem;

    display: flex;
    flex-direction: column
`

export const ProfileHeader = styled.div`
    width: 100%;
    height: auto;

    display: flex;
    align-items: center;
`

export const NavigationExit = styled.div`
    width: 100%;
    height: 6rem;

    box-sizing: border-box;

    display: flex;
    align-items: center;
    justify-content: flex-start;

    margin-top: auto;
    margin-bottom: 1rem;
    padding-left: 2rem;

    border: 0.1rem solid var(--primary-text-light);
    border-radius: 1.2rem;

    gap: 3rem;

    cursor: pointer;
`

export const NavigationItemText = styled.p`
    width: auto;

    font-weight: 400;
    font-size: 2rem;
    color: var(--primary-text-light);
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

export const SettingsLink = styled.a`
    width: 100%;
    height: 5rem;

    border-radius: 1.2rem;

    margin-top: 2rem;
    padding: 1rem;
    box-sizing: border-box;

    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: nowrap;

    gap: 2rem;

    cursor: pointer;
    text-decoration: none;

    background: var(--primary-btn-color);
    color: var(--primary-text-inverted);
    font-weight: 500;
    font-size: 1.4rem;

    * path {
        fill: var(--primary-text-inverted);
    }
`

export const TitlesBlock = styled.div`
    width: 100%;
    height: auto;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    margin-left: 1rem;
`

export const ClubName = styled.h3`
    font-weight: 400;
    font-size: 1.6rem;
    color: var(--secondary-text);

    text-align: left;
    margin-bottom: 0;
`

export const PageName = styled.h1`
    font-weight: 600;
    font-size: 2.4rem;
    color: var(--primary-text);

    text-align: left;
    margin-bottom: 0;
`