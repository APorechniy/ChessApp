import React from "react";
import { TimetableBoard } from "../components/TimetableBoard";
import { withAuth } from "../utils/with-auth";
import { PageWrapper } from "../atoms/PageWrapper";
import { usePlatform } from "../hooks/use-platform";
import { CalendarWidget } from "../components/CalendarWidget";

const GridContentWrapperDesktop: React.CSSProperties = {
    "width": "100%",
    "height": "100%",

    "display": "grid",
    "gridTemplateColumns": "7fr 3fr",
    "gap": "1rem"
}

const GridContentWrapperMobile: React.CSSProperties = {
    "width": "100%",
    "height": "100%",

    "display": "flex",
    "flexDirection": "column-reverse",
    "gap": "1rem",
    "background": "white",
    "boxSizing": "border-box",
    "margin": "0.8rem"
}

const Timetable = withAuth(() => {
    const platform = usePlatform()

    const additionalStyles = platform === "desktop" ? GridContentWrapperDesktop : GridContentWrapperMobile

    return (
        <PageWrapper contentStyles={additionalStyles}>
            <TimetableBoard />
            {
                platform === "desktop" &&
                <CalendarWidget />
            }
        </PageWrapper>
    )
})

export default Timetable;