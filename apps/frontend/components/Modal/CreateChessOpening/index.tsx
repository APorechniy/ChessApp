import React, { useEffect, useState } from "react"
import { BaseInput } from "../../../atoms/BaseInput/Input"

import { TextButton } from "../../../atoms/TextButton"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { addNotification, handleCloseModal } from "../../../store/system"
import { CreateChessOpeningFormTitle, CreateChessOpeningModal, CreateChessOpeningForm, CloseButton } from "./styled"
import { getChessOpenings } from "../../../store/chess-openings/thunk/get-chess-openings"
import { ChessOpeningWithoutId } from "../../../store/chess-openings/types"
import { createChessOpening } from "../../../store/chess-openings/thunk/create-chess-opening"
import { handleClearIsCreatedChessOpening } from "../../../store/chess-openings"
import { ClearIcon } from "../../../assets/ClearIcon"

export const CreateChessOpening = () => {
    const [name, setName] = useState("")

    const [nameError, setNameError] = useState(false)

    const dispatch = useAppDispatch()

    const { isCreateChessOpening } = useAppSelector(({ chessOpenings }) => chessOpenings)

    useEffect(() => {
        if (isCreateChessOpening === "SUCCESS") {
            dispatch(addNotification({
                title: 'Дебют создан!',
                variant: "success",
                autoCloseTimer: 2000,
            }))
            closeModal();
        }

        if (isCreateChessOpening === "ERROR") {
            dispatch(addNotification({
                title: 'Ошибка при сохранении дебюта',
                variant: 'error',
                autoCloseTimer: 2000,
            }))
        }
    }, [isCreateChessOpening, dispatch])

    const closeModal = () => {
        dispatch(getChessOpenings())
        dispatch(handleClearIsCreatedChessOpening())
        dispatch(handleCloseModal())
    }

    const handleCreateChessOpening = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const fullName = name.trim();

        if (!fullName) {
            setNameError(true)
            return
        }

        const chessOpening: ChessOpeningWithoutId = {
            name: name,
        }

        await dispatch(createChessOpening({ chessOpening: chessOpening }))
    }

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
        setNameError(false)
    }

    return (
        <CreateChessOpeningModal onClick={(e) => e.stopPropagation()}>
            <CloseButton>
                <ClearIcon onClick={closeModal} />
            </CloseButton>
            <CreateChessOpeningFormTitle className="create-chess-opening-form-title">Новый дебют</CreateChessOpeningFormTitle>
            <CreateChessOpeningForm onSubmit={handleCreateChessOpening}>
                <BaseInput
                    value={name}
                    handleInput={handleChangeName}
                    label="Название"
                    required
                    isError={nameError}
                    errorMessage="Введите название дебюта"
                />

                <TextButton
                    text={'Добавить дебют'}
                    style={{ marginTop: "2rem", height: "4rem" }}
                    role="submit"
                />
            </CreateChessOpeningForm>
        </CreateChessOpeningModal>
    )
}