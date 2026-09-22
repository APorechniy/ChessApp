import React from "react";
import { ContactsBlock, ContactsRow, VkLink, Link, SimpleContactsText } from "./styled";
import { VkIcon } from "../../assets/VkIcon";
import { useAppSelector } from "../../store/store";
import { Loader } from "../../atoms/Loader";

export const ContactsWidget = () => {
    const { settings, isLoadSettings } = useAppSelector(({ system }) => system)
    return (
        <ContactsBlock data-test-id={"contacts-block"}>
            {
                isLoadSettings === "SUCCESS"
                    ?
                    <>
                        {
                            settings?.vkLink &&
                            <ContactsRow>
                                <VkIcon />
                                <VkLink href={settings.vkLink}>Группа ВК</VkLink>
                            </ContactsRow>
                        }

                        {
                            settings?.phone &&
                            <Link data-test-id={"tel"} href={`tel:${settings.phone}`}>{settings.phone}</Link>
                        }

                        {
                            settings?.email &&
                            <Link data-test-id={"mail"} href={`mailto:${settings.email}`}>{settings.email}</Link>
                        }

                        {
                            settings?.legalName &&
                            <SimpleContactsText data-test-id={"legal-name"}>{settings.legalName}</SimpleContactsText>
                        }

                        {
                            settings?.itin &&
                            <SimpleContactsText data-test-id={"itin"}>{`ИНН: ${settings.itin}`}</SimpleContactsText>
                        }
                    </>
                    :
                    <Loader />
            }

        </ContactsBlock>
    )
}