import { useRouter } from "next/router";
import { withAuth } from "../../../utils/with-auth";
import { usePlatform } from "../../../hooks/use-platform";
import { PageWrapper } from "../../../atoms/PageWrapper";
import { SolutionChecker } from "../../../components/SolutionChecker";

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

const SolutionCheck = withAuth(() => {
    const platform = usePlatform()
    const router = useRouter();

    const additionalStyles = platform === "desktop" ? GridContentWrapperDesktop : GridContentWrapperMobile
    const { solutionId } = router.query;

    if (!solutionId || typeof solutionId !== "string") {
        return null;
    }

    return (
        <PageWrapper contentStyles={additionalStyles} isBackButton>
            <SolutionChecker />
        </PageWrapper>
    );
});

export default SolutionCheck;