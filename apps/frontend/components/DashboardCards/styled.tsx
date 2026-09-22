import styled from "styled-components";

export const CardsWrapper = styled.div`
    max-width: 100%;
    height: auto;
    box-sizing: border-box;

    flex: 1;

    margin-bottom: 1rem;

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;

    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    } 
`;

export const Card = styled.div`
    height: auto;

    border-radius: 0.8rem;

    box-sizing: border-box;
    padding: 1rem 1rem;

    display: flex;
    align-items: center;
    flex-direction: row;

    border: 0.2rem solid var(--primary-border);
    background: var(--secondary-background);

    cursor: pointer;
`;

export const LeftBlock = styled.div`
    width: 50%;
    height: auto;

    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
`

export const Image = styled.img`
    width: 38%;

    margin-left: auto;
    margin-right: 2rem;

    object-fit: contain;
    aspect-ratio: 1.5;
`

export const CardTitle = styled.h2`
    width: 100%;
    text-align: left;
    font-size: 2rem;
    margin: 0;
    color: var(--primary-text-inverted);
`;

export const CardDescription = styled.p`
    width: 100%;
    text-align: left;
    font-size: 1.5rem;
    margin-top: 1rem;
    color: var(--primary-text-inverted);
`;