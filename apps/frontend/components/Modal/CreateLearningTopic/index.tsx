import React, { useEffect, useState } from "react"
import { BaseInput } from "../../../atoms/BaseInput/Input"

import { TextButton } from "../../../atoms/TextButton"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { addNotification, handleCloseModal } from "../../../store/system"
import { BaseSelect } from "../../../atoms/BaseSelect"
import { CreateLearningTopicFormTitle, CreateLearningTopicModal, CreateLearningTopicForm, CloseButton } from "./styled"
import { LearningTopicWithoutId } from "../../../store/learning-topics/types"
import { getLearningTopics } from "../../../store/learning-topics/thunk/get-learning-topics"
import { Loader } from "../../../atoms/Loader"
import { Level } from "../../../store/levels/types"
import { getLevels } from "../../../store/levels/thunk/get-levels"
import { createLearningTopic } from "../../../store/learning-topics/thunk/create-learning-topic"
import { handleClearCreateLearningTopic } from "../../../store/learning-topics"
import { ClearIcon } from "../../../assets/ClearIcon"

type Option = { text: string, value: string }

export const CreateLearningTopic = () => {
    const [level, setLevel] = useState<Level>()
    const [name, setName] = useState<string>()
    const [description, setDescription] = useState<string>()

    const dispatch = useAppDispatch()

    const { levelsList, isLoadingLevels } = useAppSelector(({ levels }) => levels)
    const { isCreateLearningTopic } = useAppSelector(({ learningTopics }) => learningTopics)

    useEffect(() => {
        dispatch(getLevels())
    }, [dispatch])

    useEffect(() => {
        if (isCreateLearningTopic === "SUCCESS") {
            dispatch(addNotification({
                title: 'Тема обучения добавлена!',
                variant: "success",
                autoCloseTimer: 2000,
            }))
            closeModal();
        }

        if (isCreateLearningTopic === "ERROR") {
            dispatch(addNotification({
                title: 'Ошибка при добавлении темы обучения',
                variant: 'error',
                autoCloseTimer: 2000,
            }))
        }
    }, [isCreateLearningTopic, dispatch])

    const closeModal = () => {
        dispatch(getLearningTopics())
        dispatch(handleClearCreateLearningTopic())
        dispatch(handleCloseModal())
    }

    const handleCreateLearningTopic = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!name || !level) {
            return
        }

        const learningTopic: LearningTopicWithoutId = {
            name: name,
            description: description,
            level: level,
        }

        await dispatch(createLearningTopic({ learningTopic: learningTopic }))
    }

    const handleChangeLevel = (option: Option) => {
        const newLevel = levelsList.find((l) => l.id === option.value)

        if (newLevel) {
            setLevel(newLevel)
        } else {
            setLevel(levelsList[0])
        }
    }

    return (
        <CreateLearningTopicModal onClick={(e) => e.stopPropagation()}>
            <CloseButton>
                <ClearIcon onClick={closeModal} />
            </CloseButton>
            <CreateLearningTopicFormTitle className="create-learning-topic-title">Новая тема</CreateLearningTopicFormTitle>
            {(isLoadingLevels === "SUCCESS") ?
                <CreateLearningTopicForm onSubmit={handleCreateLearningTopic}>
                    <BaseInput
                        value={name}
                        handleInput={(e) => setName(e.target.value)}
                        label="Название"
                        required
                    // isError={firstNameError}
                    // errorMessage="Введите имя"
                    />

                    <BaseInput
                        value={description}
                        handleInput={(e) => setDescription(e.target.value)}
                        label="Описание"
                    // isError={firstNameError}
                    // errorMessage="Введите имя"
                    />

                    <BaseSelect
                        value={level?.id || ""}
                        options={levelsList.map((level) => {
                            return {
                                text: level.name,
                                value: level.id
                            }
                        })}
                        placeholder="Выберите уровень подготовки"
                        handleSelect={handleChangeLevel}
                        label="Уровень подготовки"
                        required
                    />

                    <TextButton
                        text={'Создать тему'}
                        style={{ marginTop: "2rem", height: "4rem" }}
                        role="submit"
                    />
                </CreateLearningTopicForm>
                :
                <Loader />
            }
        </CreateLearningTopicModal>
    )
}