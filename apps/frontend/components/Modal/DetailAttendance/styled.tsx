import styled from "styled-components";

export const DetailAttendanceModal = styled.div`
    width: min(100vw,60rem);
    max-width: 60rem;
    height: 53rem;
    max-height: 53rem;

    padding: 2rem;

    border-radius: 2rem;

    background-color: var(--primary-block-background-light);
    color: var(--primary-text);

    position: relative;

    overflow-y: scroll;
    overflow-x: hidden;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    @media (max-width: 768px) {
      margin: 1rem;
    }
`;

export const DetailAttendanceForm = styled.form`
    width: 100%;
    max-width: 100%;
    height: auto;

    box-sizing: border-box;
    padding-bottom: 2rem;
    padding-top: 2rem;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;

export const InputsBlock = styled.div`
    width: 100%;
    height: auto;

    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-columns: minmax(0, 1fr);
    gap: 1rem;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        grid-auto-columns: minmax(0, 1fr);
        gap: 1rem;
    }   
`

export const SelectsBlock = styled.div`
    width: 100%;
    height: auto;

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-columns: minmax(0, 1fr);
    gap: 1rem;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        grid-auto-columns: minmax(0, 1fr);
        gap: 1rem;
    }   
`

export const StudentsBlock = styled.div`
    width: 100%;
    height: auto;

    display: grid;
    grid-template-columns: 1fr;
    grid-auto-columns: minmax(0, 1fr);
    gap: 1rem;   
`

export const DetailAttendanceFormTitle = styled.h3`
    text-align: left;
    margin: 0;
    margin-left: 1rem;

    color: var(--primary-text);
    font-size: 2.4rem;
    font-weight: 600;
`;

export const DetailAttendanceSubtitle = styled.h3`
    text-align: left;
    margin: 0;
    margin-left: 1rem;
    margin-top: 2rem;

    color: var(--primary-text);
    font-size: 2rem;
    font-weight: 600;
`;

export const StudentsAttendedList = styled.div`
    width: 100%;
    height: 10rem;

    overflow-y: scroll;

    box-sizing: border-box;
    padding: 0.5rem;

    border: 0.1rem solid var(--primary-border);
    border-radius: 1rem;

    display: grid;
    grid-template-columns: 1fr;
    grid-auto-columns: minmax(0, 1fr);
`

export const StudentsAttendedRow = styled.div`
    width: 100%;
    height: 5rem;
    box-sizing: border-box;
    padding: 0.5rem;

    background: var(--secondary-background-light);
    border-radius: 0.6rem;

    display: flex;
    align-items: center;
`

export const StudentsAttendedName = styled.p`
    margin: 0;
    padding: 0;

    color: var(--primary-text);
    font-size: 1.6rem;
    font-weight: 500;
`

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