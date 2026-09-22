import styled from "styled-components";

export const Calendar = styled.div`
    width: 100%;
    margin-bottom: 3rem;
    margin-top: 1rem;
    height: auto;

    box-sizing: border-box;
    padding-top: 2rem;
    padding-left: 1rem;
    padding-right: 1rem;

    position: relative;
    border-radius: 1rem;

    display: flex;
    align-items: center;
    flex-direction: column;
`;

export const AttendanceCard = styled.div<{ $cardColor?: string, $borderColor?: string }>`
    width: 100%;
    height: auto;

    box-sizing: border-box;
    padding: 2rem;

    margin-top: 1rem;

    border-radius: 0.8rem;
    border-left: 1rem solid ${(props) => props.$borderColor ? props.$borderColor : 'var(--primary-btn-color)'};
    background-color: ${(props) => props.$cardColor ? props.$cardColor : 'var(--primary-btn-color)'};

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    p {
        text-align: left;
        color: ${(props) => props.$borderColor ? props.$borderColor : 'var(--primary-btn-color)'};
    }

    a {
        text-align: left;
        color: ${(props) => props.$borderColor ? props.$borderColor : 'var(--primary-btn-color)'};
    }
`;

export const EmptyAttendances = styled.div`
    width: 100%;
    height: 30rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    font-weight: 600;
    font-size: 2rem;
    color: var(--secondary-text);

    margin: 0;
`

export const CoachName = styled.p`
    width: 100%;
    font-size: 1.4rem;
    font-weight: 500;

    margin: 0;
`

export const LearningTopicName = styled.p`
    width: 100%;
    font-size: 1.4rem;
    font-weight: 500;

    margin: 0;
`

export const StartDate = styled.p`
    width: 100%;
    font-size: 1.8rem;
    font-weight: 600;

    margin: 0;
`

export const EndDate = styled.p`
    width: 100%;
    font-size: 1.8rem;
    font-weight: 600;

    margin: 0;
`

export const OnlineLink = styled.a`
    width: 100%;
    font-size: 1.4rem;
    font-weight: 500;

    margin: 0;
    padding-left: 1rem;
    padding-right: 1rem;

    text-decoration: underline;
`

export const NotificationWrapper = styled.div`
    width: auto;
    height: 4rem;

    margin-top: 1rem;
    margin-bottom: 1rem;

    display: flex;
    align-items: center;
    justify-content: center;

    box-sizing: border-box;

    border: solid 0.2rem var(--primary-btn-color);
    border-radius: 1rem;
`

export const Icon = styled.div`
    width: 2.4rem;
    height: 2.4rem;

    margin-left: 1rem;

    display: flex;
    align-items: center;
    justify-content: center: 
`