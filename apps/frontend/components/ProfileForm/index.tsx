import React, { useState } from 'react'
import { FormWrapper, ProfileHeader, Title, Wrapper } from './styled'
import { TextButton } from '../../atoms/TextButton'
import { EditIcon } from '../../assets/EditIcon'
import { Form } from './Form'
import { usePlatform } from '../../hooks/use-platform'
import { useAppSelector } from '../../store/store'
import { CoachForm } from './CoachForm'

export const ProfileForm = () => {
    const { currentUser } = useAppSelector(({ users }) => users)
    const platform = usePlatform()

    const [isEditable, setIsEditable] = useState<boolean>(platform === "mobile")

    const onSave = () => {
        if (platform === "desktop") {
            setIsEditable(false)
        }
    }

    return (
        <Wrapper>
            <ProfileHeader>
                <Title>Информация об аккаунте</Title>
                <TextButton
                    text='Редактировать'
                    Icon={EditIcon}
                    onClick={() => setIsEditable(true)}
                    style={{
                        width: "auto",
                        fontSize: "1.2rem",
                        gap: "1rem",
                        padding: "1rem 2rem",
                        marginLeft: "auto",
                        background: "var(--primary-block-background-light)",
                        color: "var(--secondary-text)",
                        border: "1px solid var(--secondary-border-color)",
                    }}
                />
            </ProfileHeader>

            <FormWrapper>
                {
                    currentUser.role === "coach"
                    &&
                    <CoachForm currentUser={currentUser} isEditable={isEditable} onSave={onSave} />
                }

                {
                    currentUser.role === "student"
                    &&
                    <Form currentUser={currentUser} isEditable={isEditable} onSave={onSave} />
                }
            </FormWrapper>
        </Wrapper>
    )
}