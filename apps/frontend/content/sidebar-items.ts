import { BookIcon } from "../assets/BookIcon";
import { DashboardIcon } from "../assets/DashboardIcon";
import { ReportsIcon } from "../assets/ReportsIcon";
import { StudentsIcon } from "../assets/StudentsIcon";
import { TasksIcon } from "../assets/TasksIcon";
import { TimetableIcon } from "../assets/TimetableIcon";

export const SIDEBAR_ITEMS = [
    {
        name: 'Дашборд',
        icon: DashboardIcon,
        id: 1,
        link: '/dashboard',
        accessedRoles: ['admin', 'coach', 'student', 'parent']
    },
    {
        name: 'Расписание',
        icon: TimetableIcon,
        id: 2,
        link: '/timetable',
        accessedRoles: ['admin', 'coach', 'student', 'parent']
    },
    {
        name: 'Ученики',
        icon: StudentsIcon,
        id: 3,
        link: '/students',
        workInProgress: false,
        accessedRoles: ['admin', 'coach']
    },
    {
        name: 'Задачи',
        icon: TasksIcon,
        id: 4,
        link: '/tasks',
        workInProgress: false,
        accessedRoles: ['admin', 'coach', 'student']
    },
    {
        name: 'Отчеты',
        icon: ReportsIcon,
        id: 5,
        link: '/reports',
        workInProgress: false,
        accessedRoles: ['admin', 'coach']
    },
    {
        name: 'Темы обучения',
        icon: BookIcon,
        id: 6,
        link: '/learning-topics',
        workInProgress: false,
        accessedRoles: ['admin', 'coach']
    }
]