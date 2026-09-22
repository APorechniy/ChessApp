import React, { useEffect } from "react";
import { withAuth } from "../utils/with-auth";
import { PageWrapper } from "../atoms/PageWrapper";
import { useRouter } from "next/router";

const Balance = withAuth(() => {
    const router = useRouter()

    useEffect(() => {
        router.push("/dashboard")
    })

    return (
        <PageWrapper>
        </PageWrapper>
    )
})

export default Balance