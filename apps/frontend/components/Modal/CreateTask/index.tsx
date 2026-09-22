import React, { useEffect, useState } from "react"
import { BaseInput } from "../../../atoms/BaseInput/Input"

import { TextButton } from "../../../atoms/TextButton"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { addNotification, handleCloseModal } from "../../../store/system"
import { BaseSelect } from "../../../atoms/BaseSelect"
import { CreateTaskFormTitle, CreateTaskModal, CreateTaskForm, InputsBlock, CloseButton } from "./styled"
import { type LearningTopics } from "../../../store/learning-topics/types"
import { getLearningTopics } from "../../../store/learning-topics/thunk/get-learning-topics"
import type { TaskWithoutId } from "../../../store/tasks/types"
import { handleClearCreatedTaskStatus } from "../../../store/tasks"
import { createTask } from "../../../store/tasks/thunk/create-task"
import { getTasks } from "../../../store/tasks/thunk/get-tasks"
import { Quality } from "../../../store/quality/types"
import { getQualitiesList } from "../../../store/quality/thunk/get-qualities-list"
import { ClearIcon } from "../../../assets/ClearIcon"

type Option = { text: string, value: string }

export const CreateTask = () => {
    const [name, setName] = useState("")
    const [learningTopic, setLearningTopic] = useState<LearningTopics>()
    const [quality, setQuality] = useState<Quality>()

    const [nameError, setNameError] = useState(false)
    const [learningTopicError, setLearningTopicError] = useState(false)

    const dispatch = useAppDispatch()

    const { isCreatedTask } = useAppSelector(({ tasks }) => tasks)
    const { learningTopicsList, isLoadingLearningTopics } = useAppSelector(({ learningTopics }) => learningTopics)
    const { qualitiesList } = useAppSelector(({ quality }) => quality)

    useEffect(() => {
        dispatch(getLearningTopics())
        dispatch(getQualitiesList({
            labelFor: "tasks"
        }))
    }, [dispatch])

    useEffect(() => {
        if (isCreatedTask === "SUCCESS") {
            dispatch(addNotification({
                title: 'Задача создана!',
                variant: "success",
                autoCloseTimer: 2000,
            }))
            closeModal();
        }

        if (isCreatedTask === "ERROR") {
            dispatch(addNotification({
                title: 'Ошибка при создании задачи',
                variant: 'error',
                autoCloseTimer: 2000,
            }))
        }
    }, [isCreatedTask, dispatch])

    const closeModal = () => {
        dispatch(getTasks({}))
        dispatch(handleClearCreatedTaskStatus())
        dispatch(handleCloseModal())
    }

    const handleCreateTask = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!name.trim()) {
            setNameError(true)
            return
        }

        if (!learningTopic || !learningTopic.id || !learningTopic.level) {
            setLearningTopicError(true)
            return
        }

        const task: TaskWithoutId = {
            name: name,
            learningTopic: learningTopic,
            quality: quality,
        }

        await dispatch(createTask({ task: task }))
    }

    const handleChangeLearningTopic = (option: Option) => {
        const newLearningTopic = learningTopicsList.find((s) => s.id === option.value)

        if (newLearningTopic) {
            setLearningTopic(newLearningTopic)
        } else {
            setLearningTopic(learningTopicsList[0])
        }

        setLearningTopicError(false)
    }

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
        setNameError(false);
    }

    const handleChangeQuality = (option: Option) => {
        const newQuality = qualitiesList.find((q) => q.id === option.value)

        if (newQuality) {
            setQuality(newQuality)
        } else {
            setQuality(qualitiesList[0])
        }
    }

    return (
        <CreateTaskModal onClick={(e) => e.stopPropagation()}>
            <CloseButton>
                <ClearIcon onClick={closeModal} />
            </CloseButton>
            <CreateTaskFormTitle className="create-tasks-form-title">Новая задача</CreateTaskFormTitle>
            {isLoadingLearningTopics === "SUCCESS" &&
                <CreateTaskForm onSubmit={handleCreateTask}>
                    <BaseInput
                        value={name}
                        handleInput={handleChangeName}
                        label="Название"
                        required
                        isError={nameError}
                        errorMessage="Введите название задачи"
                    />

                    <BaseSelect
                        value={learningTopic?.id || ""}
                        options={learningTopicsList.map(({ id, name }) => {
                            return {
                                value: id,
                                text: name,
                            }
                        })}
                        handleSelect={handleChangeLearningTopic}
                        label="Тема обучения"
                        required
                    />

                    <BaseSelect
                        value={quality?.id || ""}
                        options={qualitiesList.map((q) => {
                            return {
                                text: `${q.label}`,
                                value: q.id
                            }
                        })}
                        placeholder="Сложность задачи"
                        handleSelect={handleChangeQuality}
                        label="Сложность"
                        required
                    />

                    <TextButton
                        text={'Создать задачу'}
                        style={{ marginTop: "2rem", height: "4rem" }}
                        role="submit"
                    />
                </CreateTaskForm>
            }
        </CreateTaskModal>
    )
}