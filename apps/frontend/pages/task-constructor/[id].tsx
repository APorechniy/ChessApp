import React from "react";
import { withAuth } from "../../utils/with-auth";
import { PageWrapper } from "../../atoms/PageWrapper";
import { usePlatform } from "../../hooks/use-platform";
import { useRouter } from "next/router";
import { ChessTaskConstructor } from "../../components/CreateTaskPosition";

const GridContentWrapperDesktop: React.CSSProperties = {
    "width": "100%",
    "height": "100%",
}

const GridContentWrapperMobile: React.CSSProperties = {
    "width": "100%",
    "height": "100%",

    "display": "flex",
    "flexDirection": "column",
    "gap": "1rem",
}

const TaskConstructor = withAuth(() => {
    const router = useRouter();
    const { id } = router.query as { id: string };
    const platform = usePlatform()

    const additionalStyles = platform === "desktop" ? GridContentWrapperDesktop : GridContentWrapperMobile

    return (
        <PageWrapper contentStyles={additionalStyles}>
            <ChessTaskConstructor taskId={id} />
        </PageWrapper>
    )
})

export default TaskConstructor;