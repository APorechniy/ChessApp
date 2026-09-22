import React from 'react'
import { Wrapper } from './styled'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { handleChangeSelectedSettingsTab } from '../../store/system'
import { type SettingsTabs } from '../../store/system/types'
import { CoachSettings } from './CoachSettings'
import { MainSettings } from './MainSettings'
import { GroupsSettings } from './GroupsSettings'
import { UkassaSettings } from './UkassaSettings'
import { PresetsSettings } from './PresetsSettings'

import { TabsSwitcher, type Tab } from '../../atoms/TabsSwitcher'

const TABS: Tab[] = [
    {
        id: "MAIN_SETTINGS",
        title: "Основные настройки",
        content: <MainSettings />
    },
    {
        id: "COACHES",
        title: "Тренеры",
        content: <CoachSettings />,
    },
    {
        id: "GROUPS",
        title: "Группы учеников",
        content: <GroupsSettings />
    },
    {
        id: "PRESETS",
        title: "Шаблоны занятий",
        content: <PresetsSettings />,
    },
    {
        id: "UKASSA",
        title: "ЮКасса",
        content: <UkassaSettings />,
    },
]

export const Settings = () => {
    return (
        <Wrapper>
            <TabsSwitcher
                tabs={TABS}
                align="center"
            />
        </Wrapper>
    )
}