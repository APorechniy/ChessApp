import React from "react";
import styled from "styled-components";
import { withAuth } from "../utils/with-auth";

const Wrapper = styled.div`
    width: 100%;
    height: auto;
    box-sizing: border-box;

    padding-top: 5rem;
    padding-left: 10%;
    padding-right: 10%;

    display: flex;
    flex-direction: column;
    align-items: center;
`

const MapImage = styled.img`
    width: 60%;
    aspect-ratio: 16 /9;
`

const ContactsBlock = styled.div`
    width: 100%;
    height: auto;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
`

const ListItem = styled.li`
    font-size: 1.2rem;
    font-weight: 600;
`

const Contacts = withAuth(() => {
    return (
        <>
            <Wrapper>
                <MapImage src={"map.png"} alt="map" className="map-image" />
                <ContactsBlock>
                    <ul>
                        <ListItem>ИНН организации: 890303626220</ListItem>
                        <ListItem>Телефон: 8-918-540-32-50</ListItem>
                    </ul>
                </ContactsBlock>
            </Wrapper>
        </>
    )
})

export default Contacts