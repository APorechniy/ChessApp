import styled from "styled-components"

export const Wrapper = styled.div`
    width: 100%;
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;

    background: var(--primary-background-light);
`

export const Container = styled.div`
    width: 60rem;
    height: 45.8rem;

    background: white;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    border-radius: 1.5rem;
    
    @media (max-width: 768px) {
      margin: 1rem;
      box-sizing: border-box;
    }   
`

export const Form = styled.form`
    width: 100%;
    height: auto;

    padding-left: 10%;
    padding-right: 10%;

    box-sizing: border-box;

    margin-top: 6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

export const AuthError = styled.p`
    color: red;
    height: 1.5rem;
    text-align: center;
    font-size: 1.5rem;
    font-weight: 600;
`