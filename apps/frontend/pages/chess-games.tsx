import React from "react";
import { ChessGamesTable } from "../components/ChessGames";
import { withAuth } from "../utils/with-auth";
import { PageWrapper } from "../atoms/PageWrapper";
import { usePlatform } from "../hooks/use-platform";

const GridContentWrapperDesktop: React.CSSProperties = {
    "width": "100%",
    "height": "100%",
}

const GridContentWrapperMobile: React.CSSProperties = {
    "width": "100%",
    "height": "100%",

    "background": "white",
    "boxSizing": "border-box",
    "margin": "0.8rem"
}

const ChessGames = withAuth(() => {
    const platform = usePlatform()

    const additionalStyles = platform === "desktop" ? GridContentWrapperDesktop : GridContentWrapperMobile
    return (
        <PageWrapper contentStyles={additionalStyles}>
            <ChessGamesTable />
        </PageWrapper>
    )
})

export default ChessGames;