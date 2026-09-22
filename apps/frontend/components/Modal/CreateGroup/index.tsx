import React, { useEffect, useState } from "react"
import { BaseInput } from "../../../atoms/BaseInput/Input"

import { TextButton } from "../../../atoms/TextButton"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { addNotification, handleCloseModal } from "../../../store/system"
import { CreateGroupFormTitle, CreateGroupModal, CreateGroupForm, CloseButton } from "./styled"
import { ClearIcon } from "../../../assets/ClearIcon"
import { MultiSelect } from "../../../atoms/MultiSelect"
import { Student } from "../../../store/students/types"
import { getAllStudents } from "../../../store/students/thunk/get-all-students"
import { StudentsGroupWithoutId } from "../../../store/students-groups/types"
import { getStudentsGroups } from "../../../store/students-groups/thunk/get-students-groups"
import { handleClearIsCreatedStudentsGroup } from "../../../store/students-groups"
import { createStudentsGroup } from "../../../store/students-groups/thunk/create-students-group"

export const CreateGroup = () => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [color, setColor] = useState("")
    const [students, setStudents] = useState<Student[]>([])

    const [nameError, setNameError] = useState(false)

    const dispatch = useAppDispatch()

    const { studentsList, studentsListLoading } = useAppSelector(({ students }) => students)
    const { isCreatedStudentsGroup } = useAppSelector(({ studentsGroups }) => studentsGroups)

    useEffect(() => {
        dispatch(getAllStudents())
    }, [])

    useEffect(() => {
        if (isCreatedStudentsGroup === "SUCCESS") {
            dispatch(addNotification({
                title: 'Группа добавлена!',
                variant: "success",
                autoCloseTimer: 2000,
            }))
            closeModal();
        }

        if (isCreatedStudentsGroup === "ERROR") {
            dispatch(addNotification({
                title: 'Ошибка при добавлении группы',
                variant: 'error',
                autoCloseTimer: 2000,
            }))
        }
    }, [isCreatedStudentsGroup, dispatch])

    const closeModal = () => {
        dispatch(getStudentsGroups())
        dispatch(handleClearIsCreatedStudentsGroup())
        dispatch(handleCloseModal())
    }

    const handleCreateStudentsGroup = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const fullName = name.trim();

        if (!fullName) {
            setNameError(true)
            return
        }

        const studentsGroup: StudentsGroupWithoutId = {
            name: name,
            description: description,
            color: color,
            students: students
        }

        await dispatch(createStudentsGroup({ studentsGroup: studentsGroup }))
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

    return (
        <CreateGroupModal onClick={(e) => e.stopPropagation()}>
            <CloseButton>
                <ClearIcon onClick={closeModal} />
            </CloseButton>
            <CreateGroupFormTitle className="create-group-form-title">Новая группа</CreateGroupFormTitle>
            <CreateGroupForm onSubmit={handleCreateStudentsGroup}>
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
                    options={studentsList.map(s => ({ id: s.id, name: `${s.firstName} ${s.lastName}` }))}
                    handleInput={handleChangeStudents}
                    label="Ученики"
                    placeholder="Выберите учеников"
                    isDisabled={studentsListLoading !== "SUCCESS"}
                />

                <TextButton
                    text={'Добавить группу'}
                    style={{ marginTop: "2rem", height: "4rem" }}
                    role="submit"
                />
            </CreateGroupForm>
        </CreateGroupModal>
    )
}