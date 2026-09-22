import styled from "styled-components";

export const Calendar = styled.div`
    width: 100%;
    margin-bottom: 3rem;
    margin-top: 1rem;
    height: auto;

    box-sizing: border-box;

    position: relative;
    border-radius: 1rem;

    display: flex;
    align-items: center;
    flex-wrap: nowrap;
`;

export const AttendanceCard = styled.div<{ $cardColor?: string, $borderColor?: string }>`
    width: 20rem;

    box-sizing: border-box;
    padding-right: 1rem;

    position: absolute;

    border-radius: 0.8rem;
    border-left: 1rem solid ${(props) => props.$borderColor ? props.$borderColor : 'var(--primary-btn-color)'};
    background-color: ${(props) => props.$cardColor ? props.$cardColor : 'var(--primary-btn-color)'};

    cursor: pointer;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    &:hover {
        transform: scale(1.1);
        transition: transform 0.2s ease-in-out;
    }

    p {
        text-align: left;
        color: ${(props) => props.$borderColor ? props.$borderColor : 'var(--primary-btn-color)'};
    }
`;

export const TimeWrapper = styled.div`
    width: 100%;
    height: 100%;

    overflow-x: scroll;

    box-sizing: border-box;

    position: relative;

    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    flex-direction: column;
`;

export const Row = styled.section`
    width: 100%;
    height: 6rem;

    box-sizing: border-box;

    position: relative;
    display: inline-block;

    border-bottom: 0.2rem solid var(--primary-table-border);

    &:last-of-type {
        border-bottom: 0;
    }
`;

export const Time = styled.p`
    width: auto;
    height: auto;

    box-sizing: border-box;

    position: absolute;
    left: 1rem;
    bottom: 0.2rem;
    margin: 0;

    color: var(--primary-text-light);
    font-weight: 600;
    font-size: 1.4rem;
`;

export const StudentName = styled.p`
    width: 100%;
    font-size: 1.6rem;
    font-weight: 600;

    margin: 0;
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
    padding-left: 1rem;
`