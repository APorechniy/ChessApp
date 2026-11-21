import React, { useEffect, useState } from "react"
import { BaseInput } from "../../../atoms/BaseInput/Input"

import { TextButton } from "../../../atoms/TextButton"
import { addNotification, handleCloseModal } from "../../../store/system"
import { CreateChessOpeningFormTitle, CreateChessOpeningModal, CreateChessOpeningForm, CloseButton } from "./styled"
import { ChessOpeningWithoutId } from "../../../store/chess-openings/types"
import { ClearIcon } from "../../../assets/ClearIcon"
import { useCreateChessOpeningMutation } from "store/chess-openings/api"
import { useAppDispatch } from "store/store"

export const CreateChessOpening = () => {
    const [name, setName] = useState("")

    const [nameError, setNameError] = useState(false)

    const dispatch = useAppDispatch()

    const [createChessOpening, { isSuccess, isError }] = useCreateChessOpeningMutation()

    const closeModal = () => {
        dispatch(handleCloseModal())
    }

    useEffect(() => {
        if (isSuccess) {
            dispatch(addNotification({
                title: 'Дебют создан!',
                variant: "success",
                autoCloseTimer: 2000,
            }))
            closeModal();
        }

        if (isError) {
            dispatch(addNotification({
                title: 'Ошибка при сохранении дебюта',
                variant: 'error',
                autoCloseTimer: 2000,
            }))
        }
    }, [isSuccess, isError, dispatch])

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

        await createChessOpening({ chessOpening: chessOpening })
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