import React from "react";
import { DashboardCards } from "../components/DashboardCards";
import { withAuth } from "../utils/with-auth";
import { PageWrapper } from "../atoms/PageWrapper";
import { PaymentsHistoryWidget } from "../components/PaymentsHistoryWidget";
import { usePlatform } from "../hooks/use-platform";
import { ContactsWidget } from "../components/ContactsWidget";
import { useAppSelector } from "../store/store";
import { StudentDataWidget } from "../components/StudentDataWidget";
import { UnclosedAttendancesWidget } from "../components/UnclosedAttendancesWidget";

const GridContentWrapperDesktop: React.CSSProperties = {
    "width": "100%",
    "height": "100%",

    "display": "grid",
    "gridTemplateColumns": "1fr 30rem",
    "gap": "1rem"
}

const GridContentWrapperMobile: React.CSSProperties = {
    "width": "100%",
    "height": "100%",

    "display": "flex",
    "flexDirection": "column-reverse",
    "gap": "1rem",
}

const Dashboard = withAuth(() => {
    const { currentUser } = useAppSelector(({ users }) => users)
    const platform = usePlatform()

    const additionalStyles = platform === "desktop" ? GridContentWrapperDesktop : GridContentWrapperMobile

    return (
        <PageWrapper contentStyles={additionalStyles}>
            <div style={{ width: "100%" }}>
                <DashboardCards />
                <ContactsWidget />
            </div>
            <div style={{ width: "100%" }}>
                {
                    Boolean(currentUser && currentUser?.role === "student")
                        ?
                        <StudentDataWidget />
                        :
                        <>
                            <PaymentsHistoryWidget />
                            <UnclosedAttendancesWidget />
                        </>
                }
            </div>
        </PageWrapper>
    )
})

export default Dashboard;