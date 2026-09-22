import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    height: auto;
    max-height: 30rem;
    
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 0.8rem;

    border: 1px solid var(--primary-border);
    border-radius: 1.5rem;

    margin-bottom: 1rem;

    box-sizing: border-box;
    padding: 1rem;
`

export const NextAttendanceBlock = styled.div`
    width: 100%;

    display: flex;
    align-items: center;
    flex-direction: column;

    background: var(--light-selected-background);
    border-radius: 1rem;
`

export const WidgetItem = styled.div`
    width: 100%;
    height: 5rem;

    display: flex;
    align-items: center;

    background: var(--light-selected-background);
    border-radius: 1rem;

    box-sizing: border-box;
    padding: 0.8rem;
`

export const LeftBlock = styled.div`
    width: auto;
    height: 100%;

    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;

    box-sizing: border-box;
`

export const RightBlock = styled.div`
    width: auto;
    height: 100%;

    margin-left: auto;

    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;

    box-sizing: border-box;
`

export const Title = styled.p`
    font-weight: 600;
    color: var(--primary-text);
    font-size: 1.4rem;

    margin-left: 1rem;
`

export const TitleSecondary = styled.p`
    font-weight: 500;
    color: var(--primary-text-light);
    font-size: 1.2rem;

    margin: 0;
`

export const SubTitleSecondary = styled.p`
    font-weight: 500;
    color: var(--primary-text);
    font-size: 1.2rem;

    margin: 0;
`

export const Tag = styled.div<{ bgColor?: string, txtColor?: string }>`
    width: auto;
    height: 3rem;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;

    border-radius: 0.8rem;

    margin-left: auto;

    box-sizing: border-box;
    padding: 0 1rem;

    background: ${props => props.bgColor ? props.bgColor : "#21BDCA"};
    color: ${props => props.txtColor ? props.txtColor : "var(--primary-text-inverted)"};
    font-size: 1.4rem;
    font-weight: 600;

    p {
        white-space: nowrap;
    }
`