import React from "react";
import { withAuth } from "../utils/with-auth";
import { PageWrapper } from "../atoms/PageWrapper";
import { ReportsForm } from "../components/ReportsForm";
import { type CSSProperties } from "styled-components";
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

const Reports = withAuth(() => {
    const platform = usePlatform()

    const additionalStyles = platform === "desktop" ? GridContentWrapperDesktop : GridContentWrapperMobile

    return (
        <PageWrapper contentStyles={additionalStyles}>
            <ReportsForm />
        </PageWrapper>
    )
})

export default Reports;