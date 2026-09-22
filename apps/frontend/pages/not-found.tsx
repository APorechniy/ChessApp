import React from "react"
import { useAppSelector } from "../store/store"

import { TextButton } from "../atoms/TextButton"
import { useRouter } from "next/router"

const NotFound = () => {
    const { isAuth } = useAppSelector(({ auth }) => auth)

    const router = useRouter()

    const handleGo = () => isAuth ? router.back() : router.push("/auth")

    return (
        <div className="error-page">
            <p className="error-text">Страничка отдыхает</p>
            <img src={"Error.png"} alt="error-image" />
            <TextButton text="Назад" onClick={handleGo} />
        </div>
    )
}

export default NotFound;