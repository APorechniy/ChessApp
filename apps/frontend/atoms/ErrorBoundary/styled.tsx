import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    background: #FA6C42;
`

export const Image = styled.img`
    object-fit: contain;
    aspect-ratio: 1;

    width: 20rem;
`

export const Title = styled.h1`
    width: auto;

    font-weight: 600;
    font-size: 4rem;
    color: var(--primary-text-inverted);

    @media (max-width: 768px) {
        font-size: 1.6rem;
        padding: 0 1rem;
    }
`