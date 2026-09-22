import React from "react";
import { Wrapper } from "./styled";

import { TabsSwitcher, type Tab } from "../../atoms/TabsSwitcher";
import { StudentsForm } from "./StudentsForm";
import { CoachesForm } from "./CoachesForm";

const tabs: Tab[] = [
    {
        id: "students",
        title: "Студенты",
        content: <StudentsForm />
    },
    {
        id: "coaches",
        title: "Тренеры",
        content: <CoachesForm />
    },
]

export const ReportsForm = () => {
    return (
        <Wrapper>
            <TabsSwitcher
                tabs={tabs}
                align="center"
            />
        </Wrapper>
    )
}