import React, { useEffect, useState } from "react"
import { BaseInput } from "../../../atoms/BaseInput/Input"

import { TextButton } from "../../../atoms/TextButton"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { addNotification, handleCloseModal } from "../../../store/system"
import { BaseSelect } from "../../../atoms/BaseSelect"
import { DetailLearningTopicFormTitle, DetailLearningTopicModal, DetailLearningTopicForm, InputsBlock, CloseButton } from "./styled"
import { LearningTopics } from "../../../store/learning-topics/types"
import { getLearningTopics } from "../../../store/learning-topics/thunk/get-learning-topics"
import { Loader } from "../../../atoms/Loader"
import { Level } from "../../../store/levels/types"
import { getLevels } from "../../../store/levels/thunk/get-levels"
import { updateLearningTopic } from "../../../store/learning-topics/thunk/update-learning-topic"
import { removeLearningTopic } from "../../../store/learning-topics/thunk/remove-learning-topic"
import { handleClearRemoveLearningTopic, handleClearUpdateLearningTopic } from "../../../store/learning-topics"
import { ClearIcon } from "../../../assets/ClearIcon"

type Option = { text: string, value: string }

export const DetailLearningTopic = () => {
    const { selectedLearningTopic, isRemoveLearningTopic, isUpdateLearningTopic } = useAppSelector(({ learningTopics }) => learningTopics)
    const [level, setLevel] = useState<Level>(selectedLearningTopic.level)
    const [name, setName] = useState<string>(selectedLearningTopic.name)
    const [description, setDescription] = useState<string>(selectedLearningTopic.description)

    const dispatch = useAppDispatch()

    const { levelsList, isLoadingLevels } = useAppSelector(({ levels }) => levels)

    useEffect(() => {
        dispatch(getLevels())
    }, [dispatch])

    useEffect(() => {
        if (isUpdateLearningTopic === "SUCCESS") {
            dispatch(addNotification({
                title: 'Тема обучения отредактирована!',
                variant: "success",
                autoCloseTimer: 2000,
            }))
            closeModal();
        }

        if (isUpdateLearningTopic === "ERROR") {
            dispatch(addNotification({
                title: 'Ошибка при редактировании темы!',
                variant: "error",
                autoCloseTimer: 2000,
            }))
        }

        if (isRemoveLearningTopic === "SUCCESS") {
            dispatch(addNotification({
                title: 'Тема обучения удалена!',
                variant: "success",
                autoCloseTimer: 2000,
            }))
            closeModal();
        }

        if (isRemoveLearningTopic === "ERROR") {
            dispatch(addNotification({
                title: 'Ошибка при удалении темы!',
                variant: "error",
                autoCloseTimer: 2000,
            }))
        }
    }, [isRemoveLearningTopic, isUpdateLearningTopic, dispatch])

    const closeModal = () => {
        dispatch(getLearningTopics())
        dispatch(handleClearUpdateLearningTopic())
        dispatch(handleClearRemoveLearningTopic())
        dispatch(handleCloseModal())
    }

    const handleUpdateLearningTopic = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!name || !level || !description || !selectedLearningTopic.id) {
            return
        }

        const learningTopic: LearningTopics = {
            id: selectedLearningTopic.id,
            name: name,
            description: description,
            level: level,
        }

        await dispatch(updateLearningTopic({ learningTopic: learningTopic }))
    }

    const handleChangeLevel = (option: Option) => {
        const newLevel = levelsList.find((l) => l.id === option.value)

        if (newLevel) {
            setLevel(newLevel)
        } else {
            setLevel(levelsList[0])
        }
    }

    const handleRemoveLearningTopic = async () => {
        await dispatch(removeLearningTopic({ learningTopicId: selectedLearningTopic.id }))
    }

    return (
        <DetailLearningTopicModal onClick={(e) => e.stopPropagation()}>
            <CloseButton>
                <ClearIcon onClick={closeModal} />
            </CloseButton>
            <DetailLearningTopicFormTitle className="update-learning-topic-form-title">{selectedLearningTopic.name}</DetailLearningTopicFormTitle>
            {(isLoadingLevels === "SUCCESS") ?
                <DetailLearningTopicForm onSubmit={handleUpdateLearningTopic}>
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
                        required
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
                    <InputsBlock>
                        <TextButton
                            text={'Сохранить тему'}
                            style={{ marginTop: "2rem", height: "4rem" }}
                            role="submit"
                        />
                        <TextButton
                            text={'Удалить тему'}
                            style={{ marginTop: "2rem", height: "4rem" }}
                            type="button"
                            backgroundColor="#f6aaaaff"
                            onClick={handleRemoveLearningTopic}
                        />
                    </InputsBlock>
                </DetailLearningTopicForm>
                :
                <Loader />
            }
        </DetailLearningTopicModal>
    )
}