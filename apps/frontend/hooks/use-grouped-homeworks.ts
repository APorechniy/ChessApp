import { useMemo } from "react";
import { type Homework } from "../store/homeworks/types";

const getSectionKey = (item: Homework): string => {
    const date = new Date(item.expiresAt);
    const now = new Date();

    if (date.getTime() < now.getTime()) {
        return "Просроченные";
    }

    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfTomorrow = new Date(startOfToday);
    startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);

    const startOfDayAfterTomorrow = new Date(startOfTomorrow);
    startOfDayAfterTomorrow.setDate(startOfDayAfterTomorrow.getDate() + 1);

    if (date >= startOfToday && date < startOfTomorrow) {
        return "Истекают сегодня";
    }

    if (date >= startOfTomorrow && date < startOfDayAfterTomorrow) {
        return "Завтра";
    }

    return new Intl.DateTimeFormat("ru-RU", {
        day: "numeric",
        month: "long",
    }).format(date);
};

export const useGroupedHomeworks = (homeworksList?: Homework[]) => {
    return useMemo(() => {
        if (!homeworksList?.length) return {};

        const sorted = [...homeworksList].sort(
            (a, b) => new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime()
        );

        return sorted.reduce<Record<string, Homework[]>>((acc, item) => {
            const groupKey = getSectionKey(item);
            if (!acc[groupKey]) {
                acc[groupKey] = [];
            }
            acc[groupKey].push(item);
            return acc;
        }, {});
    }, [homeworksList]);
};