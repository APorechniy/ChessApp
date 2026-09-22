import React, { useEffect, useState } from "react"
import { BaseInput } from "../../../atoms/BaseInput/Input"

import { TextButton } from "../../../atoms/TextButton"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { addNotification, handleCloseModal } from "../../../store/system"
import { DetailGroupFormTitle, DetailGroupModal, DetailGroupForm, CloseButton, InputsBlock } from "./styled"
import { ClearIcon } from "../../../assets/ClearIcon"
import { MultiSelect } from "../../../atoms/MultiSelect"
import { type Student } from "../../../store/students/types"
import { getAllStudents } from "../../../store/students/thunk/get-all-students"
import { getStudentsGroups } from "../../../store/students-groups/thunk/get-students-groups"
import { handleChangeSelectedStudentsGroup, handleClearIsDeletedStudentsGroup, handleClearIsUpdatedStudentsGroup } from "../../../store/students-groups"
import { updateStudentsGroup } from "../../../store/students-groups/thunk/update-students-group"
import { deleteStudentsGroup } from "../../../store/students-groups/thunk/delete-students-group"

export const DetailGroup = () => {
    const { selectedStudentsGroup, isUpdatedStudentsGroup, isDeletedStudentsGroup } = useAppSelector(({ studentsGroups }) => studentsGroups)

    const [name, setName] = useState(selectedStudentsGroup.name)
    const [description, setDescription] = useState(selectedStudentsGroup.description)
    const [color, setColor] = useState(selectedStudentsGroup.color)
    const [students, setStudents] = useState<Student[]>(selectedStudentsGroup.students)

    const [nameError, setNameError] = useState(false)

    const dispatch = useAppDispatch()

    const { studentsList, studentsListLoading } = useAppSelector(({ students }) => students)

    useEffect(() => {
        dispatch(getAllStudents())
    }, [])

    useEffect(() => {
        if (isUpdatedStudentsGroup === "SUCCESS") {
            dispatch(addNotification({
                title: 'Группа отредактирована!',
                variant: "success",
                autoCloseTimer: 2000,
            }))
            closeModal();
        }

        if (isUpdatedStudentsGroup === "ERROR") {
            dispatch(addNotification({
                title: 'Ошибка при редактировании группы!',
                variant: "error",
                autoCloseTimer: 2000,
            }))
        }

        if (isDeletedStudentsGroup === "SUCCESS") {
            dispatch(addNotification({
                title: 'Группа удалена!',
                variant: "success",
                autoCloseTimer: 2000,
            }))
            closeModal();
        }

        if (isDeletedStudentsGroup === "ERROR") {
            dispatch(addNotification({
                title: 'Ошибка при удалении группы!',
                variant: "error",
                autoCloseTimer: 2000,
            }))
        }
    }, [isUpdatedStudentsGroup, isDeletedStudentsGroup, dispatch])

    const closeModal = () => {
        dispatch(getStudentsGroups())
        dispatch(handleClearIsUpdatedStudentsGroup())
        dispatch(handleClearIsDeletedStudentsGroup())
        dispatch(handleChangeSelectedStudentsGroup({
            studentsGroup: null
        }))
        dispatch(handleCloseModal())
    }

    const handleUpdateStudentsGroup = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const fullName = name.trim();

        if (!fullName) {
            setNameError(true)
            return
        }

        const studentsGroup = {
            id: selectedStudentsGroup.id,
            name: name,
            description: description,
            color: color,
            students: students
        }

        await dispatch(updateStudentsGroup({ studentsGroup: studentsGroup }))
    }

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
        setNameError(false)
    }

    const handleChangeStudents = (option: Student) => {
        const newStudents = [...students]
        const index = newStudents.findIndex((s) => s.id === option.id)

        if (index >= 0) {
            newStudents.splice(index, 1)
        } else {
            newStudents.push(option)
        }

        setStudents(newStudents)
    }

    const handleDeleteStudentsGroup = () => {
        dispatch(deleteStudentsGroup({
            studentsGroupId: selectedStudentsGroup.id
        }))
    }

    return (
        <DetailGroupModal onClick={(e) => e.stopPropagation()}>
            <CloseButton>
                <ClearIcon onClick={closeModal} />
            </CloseButton>
            <DetailGroupFormTitle className="detail-group-form-title">Редактировать группу</DetailGroupFormTitle>
            <DetailGroupForm onSubmit={handleUpdateStudentsGroup}>
                <BaseInput
                    value={name}
                    handleInput={handleChangeName}
                    label="Название группы"
                    required
                    isError={nameError}
                    errorMessage="Введите название группы"
                />

                <BaseInput
                    value={description}
                    handleInput={(event) => setDescription(event.target.value)}
                    label="Описание группы"
                />

                <MultiSelect
                    value={students}
                    options={studentsList}
                    optionsName={(o) => `${o.firstName} ${o.lastName}`}
                    handleInput={handleChangeStudents}
                    label="Ученики"
                    placeholder="Выберите учеников"
                    isDisabled={studentsListLoading !== "SUCCESS"}
                />

                <InputsBlock>
                    <TextButton
                        text={'Сохранить'}
                        style={{ marginTop: "2rem", height: "4rem" }}
                        role="submit"
                    />
                    <TextButton
                        text={'Удалить группу'}
                        style={{ marginTop: "2rem", height: '4rem' }}
                        type="button"
                        backgroundColor="#f6aaaaff"
                        onClick={handleDeleteStudentsGroup}
                    />
                </InputsBlock>
            </DetailGroupForm>
        </DetailGroupModal>
    )
}