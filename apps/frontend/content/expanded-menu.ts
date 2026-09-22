import { SettingsIcon } from "../assets/SettingsIcon";
import { StudentsIcon } from "../assets/StudentsIcon";

export const EXPANDED_MENU_ITEMS = [
    {
        id: 1,
        // TODO: сделать иконку профиля
        Icon: StudentsIcon,
        label: 'Профиль',
        accessedRoles: ['admin', 'coach', 'student', 'parent'],
        href: '/profile'
    },
    {
        id: 2,
        Icon: SettingsIcon,
        label: 'Настройки системы',
        accessedRoles: ['admin'],
        href: '/system-settings'
    },
]