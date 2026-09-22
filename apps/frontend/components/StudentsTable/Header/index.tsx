import React from "react";
import { Wrapper } from "./styled";
import { TextButton } from "../../../atoms/TextButton";
import { PlusIcon } from "../../../assets/Plus";
import { useAppDispatch } from "../../../store/store";
import { handleOpenModal } from "../../../store/system";

export const Header = () => {
    const dispatch = useAppDispatch()

    const handleOpenCreateStudent = () => {
        dispatch(handleOpenModal({
            modalContent: "CREATE_STUDENT"
        }))
    }

    return (
        <Wrapper>
            <TextButton
                text='Добавить ученика'
                Icon={PlusIcon}
                onClick={handleOpenCreateStudent}
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