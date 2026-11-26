import { useRouter } from "next/router";
import { withAuth } from "../../../utils/with-auth";
import { usePlatform } from "../../../hooks/use-platform";
import { PageWrapper } from "../../../atoms/PageWrapper";
import { HomeworkSolver } from "../../../components/HomeworkSolver";

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

const HomeworkTrain = withAuth(() => {
    const platform = usePlatform()
    const router = useRouter();

    const additionalStyles = platform === "desktop" ? GridContentWrapperDesktop : GridContentWrapperMobile
    const { homeworkId } = router.query;

    if (!homeworkId || typeof homeworkId !== "string") {
        return null;
    }

    return (
        <PageWrapper contentStyles={additionalStyles} isBackButton>
            <HomeworkSolver />
        </PageWrapper>
    );
});

export default HomeworkTrain;