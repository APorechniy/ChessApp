import React from "react";
import { Title, Wrapper } from "./styled";
import { TextButton } from "../../../../atoms/TextButton";
import { PlusIcon } from "../../../../assets/Plus";
import { useAppDispatch } from "../../../../store/store";
import { handleOpenModal } from "../../../../store/system";

export const Header = () => {
    const dispatch = useAppDispatch()

    const handleOpenCreateGroup = () => {
        dispatch(handleOpenModal({
            modalContent: "CREATE_PRESET"
        }))
    }

    return (
        <Wrapper>
            <Title>Шаблоны занятий</Title>
            <TextButton
                text='Добавить шаблон'
                Icon={PlusIcon}
                onClick={handleOpenCreateGroup}
                style={{
                    width: "auto",
                    height: "4.5rem",
                    fontSize: "1.2rem",
                    gap: "1rem",
                    padding: "1rem 2rem",
                    marginLeft: "auto",
                    color: "var(--primary-text-inverted)",
                    fontWeight: 500,
                    border: "1px solid var(--secondary-border-color)",
                }}
            />
        </Wrapper>
    )
}