import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { Wrapper, Image, Title } from './styled';
import { TextButton } from '../TextButton';

type Props = {
    children: ReactNode;
    fallback?: ReactNode;
}

type State = {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    handleReload() {
        window.sessionStorage.removeItem('persist:root');
        this.setState({ hasError: false })
        window.location.replace("/sign-in")
    }

    render(): ReactNode {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <Wrapper className="error-boundary">
                    <Image src={"images/ErrorImage.png"} alt={"ErrorImage"} />
                    <Title>Что-то пошло не так</Title>

                    <TextButton
                        onClick={() => this.handleReload()}
                        text={'Попробовать снова'}
                        style={{
                            width: "auto",
                            height: "4.5rem",
                            fontSize: "1.2rem",
                            gap: "1rem",
                            padding: "1rem 2rem",
                            color: "var(--primary-text-inverted)",
                            fontWeight: 500,
                            border: "1px solid var(--secondary-border-color)",
                        }}
                    />
                </Wrapper>
            );
        }

        return this.props.children;
    }
}