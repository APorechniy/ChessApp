import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Wrapper, Form, Container, AuthError } from "./styled";
import { BaseInput } from "../../atoms/BaseInput/Input";
import { TextButton } from "../../atoms/TextButton";
import { MainLogo } from "../../assets/MainLogo";
import { useAuth } from "../../hooks/use-auth";

export const AuthForm = () => {
    const [userName, setUserName] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [isErrorUsername, setIsErrorUsername] = useState<boolean>(false)
    const [isErrorPassword, setIsErrorPassword] = useState<boolean>(false)

    const { isAuth, isLoading, handleSignIn, authLoadingStatus } = useAuth()

    const router = useRouter()

    useEffect(() => {
        if (
            isAuth
        ) {
            router.push('/dashboard')
        }
    }, [isAuth])

    const handleAuth = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!userName.replaceAll(" ", "")) {
            setIsErrorUsername(true)
            return
        }

        if (!password) {
            setIsErrorPassword(true)
            return
        }

        handleSignIn({
            username: userName,
            password: password,
        })
    }

    const handleUsernameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsErrorUsername(false)
        setUserName(event.target.value)
    }

    const handlePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsErrorPassword(false)
        setPassword(event.target.value)
    }

    return (
        <Wrapper id="auth-form" data-test-id="auth-form">
            <Container>
                <MainLogo />
                <Form onSubmit={handleAuth}>
                    <BaseInput
                        value={userName}
                        handleInput={handleUsernameInput}
                        id={'username'}
                        name={'username'}
                        placeholder='Логин'
                        isError={isErrorUsername}
                        errorMessage="Введите логин"
                        dataTestId="login"
                    />
                    <BaseInput
                        value={password}
                        id={'password'}
                        name={'password'}
                        type={'password'}
                        handleInput={handlePasswordInput}
                        placeholder='Пароль'
                        isError={isErrorPassword}
                        errorMessage="Введите пароль"
                        dataTestId="password"
                    />
                    <AuthError>
                        {authLoadingStatus === "ERROR" && "Неверный логин или пароль"}
                    </AuthError>
                    <TextButton
                        role={'submit'}
                        text='Войти'
                        disabled={isLoading}
                        style={{ padding: "1.4rem 0" }}
                        dataTestId="login-submit"
                    />
                </Form>
            </Container>
        </Wrapper>
    )
}