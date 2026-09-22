import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch } from '../store/store';
import { handleChangeCurrentPage } from '../store/system';

type PageURL = string;
type PageName = string;
export type PageMap = Record<PageURL, PageName>;

const pageMap: PageMap = {
    "/": "Дашборд",
    "/balance": "Пополнить баланс",
    "/chess-games": "Партии",
    "/chess-openings": "Дебюты",
    "/confirm-payment": "Подтверждение платежа",
    "/learning-topics": "Темы обучения",
    "/reports": "Отчёты",
    "/dashboard": "Дашборд",
    "/profile": "Настройки профиля",
    "/students": "Ученики",
    "/timetable": "Расписание",
    "/tasks": "Задачи",
    "/contacts": "Контакты",
    "/system-settings": "Настройки системы",
    "/statistic": "Статистика",
    "/task-constructor": "Конструктор задач"
};

export const useUrlChange = () => {
    const router = useRouter();
    const pathname = router.asPath;

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (pageMap[pathname]) {
            dispatch(handleChangeCurrentPage({
                pageName: pageMap[pathname]
            }))
            return
        }

        const matchingPath = Object.keys(pageMap).find(pagePath =>
            pathname.startsWith(pagePath) && pagePath !== '/'
        );

        if (matchingPath) {
            dispatch(handleChangeCurrentPage({
                pageName: pageMap[matchingPath]
            }))
            return
        }

        dispatch(handleChangeCurrentPage({
            pageName: "Навигационная панель"
        }))
    }, [pathname]);
};