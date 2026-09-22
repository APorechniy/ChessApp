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

export const AttendanceCard = styled.div<{ $cardColor?: string, $borderColor?: string }>`
    width: 100%;
    height: auto;

    box-sizing: border-box;

    margin-top: 1rem;

    border-radius: 0.8rem;
    border-left: 1rem solid ${(props) => props.$borderColor ? props.$borderColor : 'var(--primary-btn-color)'};
    background-color: ${(props) => props.$cardColor ? props.$cardColor : 'var(--primary-btn-color)'};

    cursor: pointer;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    p {
        text-align: left;
        color: ${(props) => props.$borderColor ? props.$borderColor : 'var(--primary-btn-color)'};
    }
`;

export const StudentName = styled.p`
    width: 100%;
    font-size: 1.6rem;
    font-weight: 600;

    margin: 0;
    
    box-sizing: border-box;
    margin-top: 1rem;
    padding-left: 1rem;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

export const CoachName = styled.p`
    width: 100%;
    font-size: 1.2rem;
    font-weight: 500;

    margin: 0;
    box-sizing: border-box;
    padding-left: 1rem;
`

export const DateItem = styled.p`
    font-weight: 500;
    font-size: 1.2rem;

    margin: 0;
    padding-left: 1rem;

    margin-bottom: 1rem;
`

export const EmptyList = styled.div`
    width: 100%;
    height: 20rem;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 1.2rem;
    font-weight: 600;
`