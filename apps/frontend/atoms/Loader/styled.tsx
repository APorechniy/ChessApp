import styled from "styled-components";

export const LoaderWrapper = styled.div`
    flex: 1;

    display: flex;
    align-items: center;
    justify-content: center;
`

export const LoaderAtom = styled.div`
    width: 2.4rem;
    height: 2.4rem;

    background: #337AB7;
    border-radius: 50%;
    position: relative;
    box-sizing: border-box;
    animation: rotation 1.5s linear infinite;

    overflow: hidden;

    display: grid;
    grid-template-columns: 1.2rem 1.2rem;
    grid-template-rows: 1.2rem 1.2rem;

    @keyframes rotation {
        from {
            transform: rotate(0);
        }

        to {
            transform: rotate(360deg);
        }
    }
`

export const LightField = styled.div`
    background: #f0d9b5;
`

export const DarkField = styled.div`
    background: #b58863;
`