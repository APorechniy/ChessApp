import styled from "styled-components";

export const Page = styled.div`
    width: 100vw;
    height: 100vh;

    display: flex;
    flex-direction: column;

    background: var(--primary-background-light);

    @media (max-width: 768px) {
        height: auto;
        min-height: 100vh;
    }
`

export const Overlay = styled.div<{ $isShow: boolean }>`
    width: 100vw;
    height: 100vh;

    display: ${props => props.$isShow ? "block" : "none"};

    background: rgba(35, 35, 35, 0.2);

    position: fixed;
    top: 0;
    left: 0;

    z-index: 1;
`