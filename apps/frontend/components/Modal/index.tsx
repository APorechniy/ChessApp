import React from "react";
import { createPortal } from "react-dom"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { handleCloseModal } from "../../store/system";
import { ModalContainer } from "./styled";
import { CreateAttendance } from "./CreateAttendance";
import { CreateCoach } from "./CreateCoach";
import { CreateGroup } from "./CreateGroup";
import { DetailAttendance } from "./DetailAttendance";
import { CreateChessOpening } from "./CreateChessOpening";
import { CreateChessGame } from "./CreateChessGame";
import { CreateLearningTopic } from "./CreateLearningTopic";
import { CreateStudent } from "./CreateStudent";
import { DetailStudent } from "./DetailStudent";
import { CreateTask } from "./CreateTask";
import { DetailTask } from "./DetailTask";
import { DetailLearningTopic } from "./DetailLearningTopic";
import { PutBalance } from "./PutBalance";
import { DetailCoach } from "./DetailCoach";
import { DetailGroup } from "./DetailGroup";
import { CreatePreset } from "./CreatePreset";
import { DetailPreset } from "./DetailPreset";

export const Modal: React.FC = () => {
    const { isOpenModal, modalContent } = useAppSelector(({ system }) => system);

    const dispatch = useAppDispatch()

    const handleClose = () => dispatch(handleCloseModal())

    if (!isOpenModal || !modalContent) {
        handleClose()
        return null
    }

    const modals: Record<typeof modalContent, React.JSX.Element> = {
        "CREATE_ATTENDANCE": <CreateAttendance />,
        "CREATE_PRESET": <CreatePreset />,
        "CREATE_COACH": <CreateCoach />,
        "CREATE_GROUP": <CreateGroup />,
        "CREATE_STUDENT": <CreateStudent />,
        "CREATE_TASK": <CreateTask />,
        "CREATE_CHESS_OPENING": <CreateChessOpening />,
        "CREATE_LEARNING_TOPIC": <CreateLearningTopic />,
        "CREATE_CHESS_GAME": <CreateChessGame />,
        "DETAIL_ATTENDANCE": <DetailAttendance />,
        "DETAIL_PRESET": <DetailPreset />,
        "DETAIL_GROUP": <DetailGroup />,
        "DETAIL_TASK": <DetailTask />,
        "DETAIL_LEARNING_TOPIC": <DetailLearningTopic />,
        "DETAIL_STUDENT": <DetailStudent />,
        "DETAIL_COACH": <DetailCoach />,
        "PUT_BALANCE": <PutBalance />
    }

    return createPortal(
        <ModalContainer onClick={handleClose}>
            {
                modals[modalContent]
            }
        </ModalContainer>,
        document.body,
    )
}