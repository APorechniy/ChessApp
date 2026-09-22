import React from "react";
import { withAuth } from "../utils/with-auth";
import { PageWrapper } from "../atoms/PageWrapper";
import { ProfileForm } from "../components/ProfileForm";

const Profile = withAuth(() => {
    return (
        <PageWrapper>
            <ProfileForm />
        </PageWrapper>
    )
})

export default Profile;