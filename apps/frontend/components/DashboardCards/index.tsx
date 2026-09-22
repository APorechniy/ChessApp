import React from "react"
import { Card, CardDescription, CardsWrapper, CardTitle, Image, LeftBlock } from "./styled"
import { CARDS } from "../../content/dashboard-cards"
import { useRouter } from "next/router"
import { useAppSelector } from "../../store/store"
import { Loader } from "../../atoms/Loader"

export const DashboardCards = () => {
    const { currentUser } = useAppSelector(({ users }) => users)
    const router = useRouter()

    const handleClick = (link: string) => router.push(link)

    return (
        <CardsWrapper>
            {
                Boolean(currentUser && currentUser.id) ?
                    CARDS.map(({ id, name, description, link, accessedRoles, image, dataTestId }) => (
                        accessedRoles.includes(currentUser.role) &&
                        <Card data-test-id={dataTestId} key={id} onClick={() => handleClick(link)}>
                            <LeftBlock>
                                <CardTitle>
                                    {name}
                                </CardTitle>
                                <CardDescription>
                                    {description}
                                </CardDescription>
                            </LeftBlock>

                            <Image src={image} />
                        </Card>
                    ))
                    :
                    <Loader />
            }
        </CardsWrapper>
    )
}