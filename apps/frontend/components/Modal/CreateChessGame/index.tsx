import React, { useEffect, useState } from "react"
import { BaseInput } from "../../../atoms/BaseInput/Input"
import { BaseSelect } from "../../../atoms/BaseSelect"
import { TextButton } from "../../../atoms/TextButton"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { addNotification, handleCloseModal } from "../../../store/system"
import { CreateChessGameFormTitle, CreateChessGameModal, CreateChessGameForm, InputsBlock, CloseButton } from "./styled"
import { getChessOpenings } from "../../../store/chess-openings/thunk/get-chess-openings"
import { ChessOpening } from "../../../store/chess-openings/types"
import { createChessGame } from "../../../store/chess-games/thunk/create-chess-game"
import { getChessGames } from "../../../store/chess-games/thunk/get-chess-games"
import { handleClearIsCreatedChessGame } from "../../../store/chess-games"
import { ChessGameWithoutId } from "../../../store/chess-games/types"
import { dateToLocaleISO } from "../../../utils/date-to-locale-iso"
import { dateToHTMLValidate } from "../../../utils/date-to-html-validate"
import { ClearIcon } from "../../../assets/ClearIcon"

type Option = { text: string, value: string }

export const CreateChessGame = () => {
    const [whitePlayer, setWhitePlayer] = useState("")
    const [blackPlayer, setBlackPlayer] = useState("")
    const [year, setYear] = useState("")
    const [chessOpening, setChessOpening] = useState<ChessOpening>()

    const [whitePlayerError, setWhitePlayerError] = useState<boolean>(false)
    const [blackPlayerError, setBlackPlayerError] = useState<boolean>(false)
    const [yearError, setYearError] = useState<boolean>(false)
    const [chessOpeningError, setChessOpeningError] = useState<boolean>(false)

    const dispatch = useAppDispatch()

    const { chessOpeningsList, isLoadingChessOpenings } = useAppSelector(({ chessOpenings }) => chessOpenings)
    const { isCreateChessGame } = useAppSelector(({ chessGames }) => chessGames)

    useEffect(() => {
        dispatch(getChessOpenings())
    }, [])

    useEffect(() => {
        if (isCreateChessGame === "SUCCESS") {
            dispatch(addNotification({
                title: 'Партия создана!',
                variant: "success",
                autoCloseTimer: 2000,
            }))
            closeModal();
        }

        if (isCreateChessGame === "ERROR") {
            dispatch(addNotification({
                title: 'Ошибка при создании партии',
                variant: 'error',
                autoCloseTimer: 2000,
            }))
        }
    }, [isCreateChessGame, dispatch])

    const closeModal = () => {
        dispatch(getChessGames({}))
        dispatch(handleClearIsCreatedChessGame())
        dispatch(handleCloseModal())
    }

    const handleChangeChessOpening = (option: Option) => {
        const newChessOpening = chessOpeningsList.find((s) => s.id === option.value)

        if (newChessOpening) {
            setChessOpening(newChessOpening)
        } else {
            setChessOpening(newChessOpening[0])
        }

        setChessOpeningError(false)
    }

    const handleCreateChessGame = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const whitePlayerFinal = whitePlayer.trim()
        const blackPlayerFinal = blackPlayer.trim()

        if (!whitePlayerFinal) {
            setWhitePlayerError(true)
            return
        }

        if (!blackPlayerFinal) {
            setBlackPlayerError(true)
            return
        }

        if (!year) {
            setYearError(true)
            return
        }

        if (!chessOpening || !chessOpening.id) {
            setChessOpeningError(true)
            return
        }

        const chessGame: ChessGameWithoutId = {
            whitePlayer: whitePlayer,
            blackPlayer: blackPlayer,
            year: dateToLocaleISO(new Date(year)),
            chessOpening: chessOpening,
        }

        await dispatch(createChessGame({ chessGame: chessGame }))
    }

    const handleChangeWhitePlayer = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWhitePlayer(event.target.value)
        setWhitePlayerError(false)
    }

    const handleChangeBlackPlayer = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBlackPlayer(event.target.value)
        setBlackPlayerError(false)
    }

    const handleChangeYear = (event: React.ChangeEvent<HTMLInputElement>) => {
        setYear(event.target.value)
        setYearError(false)
    }

    return (
        <CreateChessGameModal onClick={(e) => e.stopPropagation()}>
            <CloseButton>
                <ClearIcon onClick={closeModal} />
            </CloseButton>
            <CreateChessGameFormTitle className="create-chess-opening-form-title">Новая партия</CreateChessGameFormTitle>
            {isLoadingChessOpenings === "SUCCESS" &&
                <CreateChessGameForm onSubmit={handleCreateChessGame}>
                    <InputsBlock>
                        <BaseInput
                            value={whitePlayer}
                            handleInput={handleChangeWhitePlayer}
                            label="Игрок белыми"
                            required
                            isError={whitePlayerError}
                            errorMessage="Выберите игрока белыми фигурами"
                        />

                        <BaseInput
                            value={blackPlayer}
                            handleInput={handleChangeBlackPlayer}
                            label="Игрок черными"
                            required
                            isError={blackPlayerError}
                            errorMessage="Выберите игрока черными фигурами"
                        />

                        <BaseInput
                            value={year.toLocaleString()}
                            handleInput={handleChangeYear}
                            label="Дата партии"
                            type="date"
                            required
                            max={dateToHTMLValidate(new Date())}
                            isError={yearError}
                            errorMessage="Выберите дату, когда была сыграна партия"
                        />

                        <BaseSelect
                            value={chessOpening?.id || ""}
                            options={chessOpeningsList.map((co) => {
                                return {
                                    text: co.name,
                                    value: co.id
                                }
                            })}
                            placeholder="Дебют"
                            handleSelect={handleChangeChessOpening}
                            label="Дебют"
                            required
                        />
                    </InputsBlock>

                    <TextButton
                        text={'Добавить партию'}
                        style={{ marginTop: "1.2rem", height: "4rem" }}
                        role="submit"
                    />
                </CreateChessGameForm>
            }
        </CreateChessGameModal>
    )
}