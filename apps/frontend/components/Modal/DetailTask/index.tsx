import React, { useEffect, useState } from "react"
import { BaseInput } from "../../../atoms/BaseInput/Input"

import { TextButton } from "../../../atoms/TextButton"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { addNotification, handleCloseModal } from "../../../store/system"
import { BaseSelect } from "../../../atoms/BaseSelect"
import { DetailTaskModal, DetailTaskForm, DetailTaskFormTitle, InputsBlock, CloseButton } from "./styled"
import { type LearningTopics } from "../../../store/learning-topics/types"
import { getLearningTopics } from "../../../store/learning-topics/thunk/get-learning-topics"
import type { Task } from "../../../store/tasks/types"
import { handleClearIsUpdatedTask, handleClearRemovedTaskStatus } from "../../../store/tasks"
import { getTasks } from "../../../store/tasks/thunk/get-tasks"
import { updateTask } from "../../../store/tasks/thunk/update-task"
import { removeTask } from "../../../store/tasks/thunk/remove-task"
import { Quality } from "../../../store/quality/types"
import { getQualitiesList } from "../../../store/quality/thunk/get-qualities-list"
import { ClearIcon } from "../../../assets/ClearIcon"

type Option = { text: string, value: string }

export const DetailTask = () => {
    const dispatch = useAppDispatch()

    const { selectedTask, isUpdatedTask, isRemovedTask } = useAppSelector(({ tasks }) => tasks)
    const { learningTopicsList, isLoadingLearningTopics } = useAppSelector(({ learningTopics }) => learningTopics)
    const { qualitiesList } = useAppSelector(({ quality }) => quality)

    const [name, setName] = useState(selectedTask.name)
    const [learningTopic, setLearningTopic] = useState<LearningTopics>(selectedTask.learningTopic)
    const [quality, setQuality] = useState<Quality>(selectedTask.quality)

    useEffect(() => {
        dispatch(getLearningTopics())
        dispatch(getQualitiesList({
            labelFor: "tasks"
        }))
    }, [dispatch])

    useEffect(() => {
        if (isUpdatedTask === "SUCCESS") {
            dispatch(addNotification({
                title: 'Задача отредактирована!',
                variant: "success",
                autoCloseTimer: 2000,
            }))
            closeModal();
        }

        if (isUpdatedTask === "ERROR") {
            dispatch(addNotification({
                title: 'Ошибка при редактировании задачи!',
                variant: "error",
                autoCloseTimer: 2000,
            }))
        }

        if (isRemovedTask === "SUCCESS") {
            dispatch(addNotification({
                title: 'Задача удалена!',
                variant: "success",
                autoCloseTimer: 2000,
            }))
            closeModal();
        }

        if (isRemovedTask === "ERROR") {
            dispatch(addNotification({
                title: 'Ошибка при удалении задачи!',
                variant: "error",
                autoCloseTimer: 2000,
            }))
        }
    }, [isUpdatedTask, isRemovedTask, dispatch])

    const closeModal = () => {
        dispatch(getTasks({}))
        dispatch(handleClearIsUpdatedTask())
        dispatch(handleClearRemovedTaskStatus())
        dispatch(handleCloseModal())
    }

    const handleUpdateTask = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!learningTopic || !name) {
            return
        }

        const task: Task = {
            id: selectedTask.id,
            name: name,
            learningTopic: learningTopic,
            quality: quality,
        }

        await dispatch(updateTask({ task: task }))
    }

    const handleChangeLearningTopic = (option: Option) => {
        const newLearningTopic = learningTopicsList.find((s) => s.id === option.value)

        if (newLearningTopic) {
            setLearningTopic(newLearningTopic)
        } else {
            setLearningTopic(learningTopicsList[0])
        }
    }

    const handleChangeQuality = (option: Option) => {
        const newQuality = qualitiesList.find((q) => q.id === option.value)

        if (newQuality) {
            setQuality(newQuality)
        } else {
            setQuality(qualitiesList[0])
        }
    }

    const handleRemoveTask = async () => {
        await dispatch(removeTask({ taskId: selectedTask.id }))
    }

    return (
        <DetailTaskModal onClick={(e) => e.stopPropagation()}>
            <CloseButton>
                <ClearIcon onClick={closeModal} />
            </CloseButton>
            <DetailTaskFormTitle className="detail-task-form-title">Редактировать задачу</DetailTaskFormTitle>
            {isLoadingLearningTopics === "SUCCESS" &&
                <DetailTaskForm onSubmit={handleUpdateTask}>
                    <BaseInput
                        value={name}
                        handleInput={(event) => setName(event.target.value)}
                        label="Название"
                        required
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

                    <InputsBlock>
                        <TextButton
                            text={'Сохранить задачу'}
                            style={{ marginTop: "2rem", height: "4rem" }}
                            role="submit"
                        />
                        <TextButton
                            text={'Удалить задачу'}
                            style={{ marginTop: "2rem", height: "4rem" }}
                            type="button"
                            backgroundColor="#f6aaaaff"
                            onClick={handleRemoveTask}
                        />
                    </InputsBlock>
                </DetailTaskForm>
            }
        </DetailTaskModal>
    )
}